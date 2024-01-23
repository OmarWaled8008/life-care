import { Request, Response, NextFunction } from 'express';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const emailPattern: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (emailPattern.test(email)) {
        next();
    } else {
        res.status(400).json({ error: 'Invalid email address' });
    }
};

export {validateEmail}
