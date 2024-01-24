import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';

import { db } from '../utils/db.server';
import {
    neededPayload,
    attachCookieToResponse
} from "../utils/jwt-utils";
import { BadRequestError } from '../errors/index'

//Login
const adminLogin = async (req: Request, res: Response): Promise<void> => {
    try {

        const { email, password } = req.body;

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPasswordHash = process.env.ADMIN_PASSWORD

        const isPasswordMatch = await bcrypt.compare(password, adminPasswordHash)

        if(email !== adminEmail || !isPasswordMatch) {
            res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid admin credentials' })
            return
        }

        const existingAdmin = await db.admin.findUnique({
            where: { email: adminEmail }
        })

        let newAdmin
        if(!existingAdmin) {
            newAdmin = await db.admin.create({
                data: {
                    name: 'Admin',
                    email: adminEmail,
                    password: adminPasswordHash
                }
            })
        }

        const payload = neededPayload(newAdmin || existingAdmin);

        attachCookieToResponse({ res, payload });

        res.status(StatusCodes.OK).json({ message: 'Admin logged in successfully', user:payload})
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

//logout
const adminLogout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token');
        res.status(StatusCodes.OK).json({ message: 'Admin Logged out successfully.' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create Doctor only access by Admin
const createDoctor = async (req: Request, res: Response): Promise<void> => {
    try {

        const { name, email, password, price, phone, specialization, averageRate,} = req.body;

        if (!name || !email || !password || !price || !phone ||!specialization || !averageRate) {
            throw new BadRequestError("All fields must be provide")
        }

        // Check if the email already exists
        const existingUser = await db.doctor.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(400).json({ error: 'Doctor Email is already exist.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newDoctor = await db.doctor.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                price,
                specialization,
                averageRate,
            },
        });

        // Create a payload for the JWT
        const payload = neededPayload(newDoctor);

        // // Attach the JWT to the response cookie
        attachCookieToResponse({ res, payload });

        res.status(StatusCodes.CREATED).json({ message: 'Doctor created successfully', user: newDoctor })
    } catch (error) {
        console.error('Error while creating doctor:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
} 


const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await db.user.findMany()
        res.status(StatusCodes.OK).json({users})
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const getAllDoctors = async (req: Request, res: Response): Promise<void> => {
    try {
        const doctors = await db.doctor.findMany()
        res.status(StatusCodes.OK).json({doctors})
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {adminLogin, adminLogout, createDoctor,getAllUsers, getAllDoctors} 
