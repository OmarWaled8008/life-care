import { isTokenValid } from "../utils/userService";
import { UnauthenticatedError } from "../errors/index";
import { Request, Response, NextFunction } from 'express';

// Define the structure of the user payload
interface UserPayload {
    id?: string;
    email?: string;
    [key: string]: any;
}

// Augment the Request type to include the 'user' property
declare module 'express-serve-static-core' {
    interface Request {
        user?: UserPayload;
    }
}


// Create middleware for authentication checking for tokens
const authenticationUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies.token;

    if (!token) {
        throw new UnauthenticatedError("Authentication failed");
    }

    // If token is valid, verify it
    try {
        const payload: UserPayload = isTokenValid({ token });

        // This req.user will be accessed in the next middleware easily
        req.user = { ...payload };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication failed");
    }
};

export { authenticationUser};