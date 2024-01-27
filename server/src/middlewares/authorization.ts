//Admin-only
import { Request, Response, NextFunction } from 'express';
const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    //console.log('User in isAdminMiddleware:', user);
    
    if (user && user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Access denied for non-admin users' });
    }
};

//Doctor-only
const isDoctorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    console.log('User in isDoctorMiddleware:', user);
    
    if (user && user.role === 'DOCTOR') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Access denied for non-doctors users' });
    }
};

//Users only 
const isUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    console.log('User in isUserMiddleware:', user);
    
    if (user && user.role === 'USER') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Access denied for non-normal users ' });
    }
};

export { isAdminMiddleware, isDoctorMiddleware , isUserMiddleware}