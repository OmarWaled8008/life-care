import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';

import { db } from '../utils/db.server';
import {
    neededPayload,
    attachCookieToResponse
} from "../utils/userService";

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

export {adminLogin, adminLogout} 
