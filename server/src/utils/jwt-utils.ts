import jwt from 'jsonwebtoken';

const createToken = ({ payload }: { payload: Record<string, any> }): string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_LIFETIME as string,
    });
    return token;
};

const neededPayload = (data: Record<string, any>): Record<string, any> => {
    return { userId: data.id, userName: data.userName,  role: data.role };
};

const isTokenValid = ({ token }: { token: string }): Record<string, any> => {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as Record<string, any>;
    return payload;
};

const attachCookieToResponse = ({ res, payload }: { res: any, payload: Record<string, any> }): void => {
    const token = createToken({ payload });
    const day = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + day),
        signed: true,
    });
};

export {
    createToken,
    neededPayload,
    isTokenValid,
    attachCookieToResponse,
};
