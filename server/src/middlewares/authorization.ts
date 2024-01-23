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

export { isAdminMiddleware }