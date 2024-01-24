import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/index'
import { StatusCodes } from "http-status-codes";

import { db } from '../utils/db.server';
import {
    neededPayload,
    attachCookieToResponse
} from "../utils/jwt-utils";


//Login
const loingDoctor = async (req: Request, res: Response): Promise<void> => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError("Email and Password must be provide")
        }

        // Find user by email using Prisma
        const docotr = await db.doctor.findUnique({
            where: { email },
        });

        if(!docotr) {
            throw new NotFoundError("No doctor with this Email")
        }

        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, docotr.password);

        if(!isMatch) {
            throw new  UnauthorizedError(" Wrong password ")
        }

        const payload = neededPayload(docotr);
        payload.role = 'DOCTOR';

        attachCookieToResponse({ res, payload });

        res.status(StatusCodes.OK).json({ docotr: payload });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const logoutDocor = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token');
        res.status(StatusCodes.OK).json({ message: 'Logged out successfully.' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { loingDoctor, logoutDocor }