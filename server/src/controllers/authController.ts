import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/index'
import { StatusCodes } from "http-status-codes";

import { db } from '../utils/db.server';
import {
    neededPayload,
    attachCookieToResponse
} from "../utils/userService";


//Register
const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const { userName, email, password, age, gender } = req.body;

        if (!userName || !email || !password) {
            throw new BadRequestError("All fields must be provide")
        }

        // Check if the email already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(400).json({ error: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await db.user.create({
            data: {
                userName,
                email,
                password: hashedPassword,
                age,
                gender,
            },
        });

        // Create a payload for the JWT
        const payload = neededPayload(newUser);

        // Attach the JWT to the response cookie
        attachCookieToResponse({ res, payload });

        res.status(StatusCodes.CREATED).json({ message: 'User registered successfully', user: newUser })
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}  

//Login
const loingUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError("Email and Password must be provide")
        }

        // Find user by email using Prisma
        const user = await db.user.findUnique({
            where: { email },
        });

        if(!user) {
            throw new NotFoundError("No user with this Email")
        }

        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new  UnauthorizedError(" Wrong password ")
        }

        const payload = neededPayload(user);

        attachCookieToResponse({ res, payload });

        res.status(StatusCodes.OK).json({ user: payload });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token');
        res.status(StatusCodes.OK).json({ message: 'Logged out successfully.' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export { registerUser, loingUser, logoutUser }