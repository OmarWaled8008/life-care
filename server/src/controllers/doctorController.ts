import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/index'
import { StatusCodes } from "http-status-codes";

import { db } from '../utils/db.server';
import {
    neededPayload,
    attachCookieToResponse
} from "../utils/jwt-utils";
import { generatePasswordResetToken } from "../utils/reset-utils";
import { sendPasswordResetEmail } from "../utils/email-utils";


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

//Get Doctor Data by id
const getDoctorDataById = async (req: Request, res: Response): Promise<void> => {
    try {
        const  doctorId  = parseInt(req.params.id, 10)
        //console.log('Doctor ID:', doctorId);

        const doctor = await db.doctor.findUnique({
            where: {id : doctorId},
        })

        if(!doctor) {
            res.status(StatusCodes.NOT_FOUND).json({ error: 'Doctor not found' });
        }

        const responseData = {
            name: doctor.name,
            sessionPrice: doctor.price,
            phone: doctor.phone,
            specialization: doctor.specialization,
            averageDoctorRate:doctor.averageRate,
            numberOfPatientsPerMonth: doctor.numberOfPatientsPerMonth
        }

        res.status(StatusCodes.OK).json({profile: responseData})
    } catch (error) {
        console.error('Error When get doctor data in:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

// Read appointment
const getDoctorAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const doctorId = req.user?.userId;

        console.log(doctorId)

        const appointments = await db.appointment.findMany({
            where: { doctorId: doctorId },
            select: {
                patientName: true,
                phoneNumber: true,
                address: true,
                gender: true,
                bookTime: true,
                status: true
            }
        })

        console.log('Retrieved appointments:', appointments)
        res.status(StatusCodes.OK).json({ appointments })
    } catch (error) {
        console.error('Error When get doctor appoitments in:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

// Doctor Accept or Cancle app
const acceptOrCancel = async (req: Request, res: Response): Promise <void> => {
    try {
        const { action } = req.body  //ACCEPTED CANCELLED
        const appId : number = parseInt(req.params?.id, 10)
        console.log(appId)

        const appointments = await db.appointment.update({
            where: { id: appId },
            data: { status: action.toUpperCase() }
        })

        // Logic :Notify user about the action later...

        res.json({ message: `Appointment ${action}ed successfully` });
    } catch (error) {
        console.error('Error When update doctor appoitments state in:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}


//Reset password
const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        const doctor = await db.doctor.findUnique({
            where: { email }
        })

        if(!doctor) {
            res.status(StatusCodes.NOT_FOUND).json({ error: 'Doctor not found' });
        }

        // Generate a unique password reset token
        const resetToken = generatePasswordResetToken();

        // Save the token in the database associated with the doctor
        await db.doctor.update({
            where: { id: doctor.id},
            data: { passwordResetToken: resetToken },
        })

        //send reset token to the doctor via email
        await sendPasswordResetEmail(doctor.email, resetToken);

        res.status(StatusCodes.OK).json({ message : "Go check your email Password reset email sended" })

    } catch (error) {
        console.error('Error initiating password reset:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token, newPassword } = req.body;

        const doctor = await db.doctor.findFirst({
            where: { passwordResetToken: token },
        });

        if(!doctor){
            res.status(StatusCodes.NOT_FOUND).json({ error: 'Invaild or expired reset token' });
        }

        // hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // update the doctor password && clear the reset token
        await db.doctor.update({
            where: {id: doctor.id},
            data: {
                password: hashedPassword,
                passwordResetToken: null
            }
        })

        res.status(StatusCodes.OK).json({ message: 'Password reset successful' });

    } catch (error) {
        console.error('Error initiating password reset:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
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

export { loingDoctor, logoutDocor, requestPasswordReset, resetPassword, getDoctorDataById, getDoctorAppointments, acceptOrCancel }