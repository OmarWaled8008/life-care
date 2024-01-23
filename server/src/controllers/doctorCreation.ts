import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { BadRequestError } from '../errors/index'
import { StatusCodes } from "http-status-codes";

import { db } from '../utils/db.server';
import {
    neededPayload,
    attachCookieToResponse
} from "../utils/userService";


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

        // Attach the JWT to the response cookie
        attachCookieToResponse({ res, payload });

        res.status(StatusCodes.CREATED).json({ message: 'Doctor created successfully', user: newDoctor })
    } catch (error) {
        console.error('Error while creating doctor:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
} 

export { createDoctor }