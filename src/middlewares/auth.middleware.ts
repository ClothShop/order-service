import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    UserID: string;
    Role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) {
        console.error('No token provided.');
        return res.status(401).json({ message: 'Нет токена авторизации.' });
    }

    // @ts-ignore
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: UserPayload) => {
        if (err) {
            console.log('jwt error:', err, 'jwt secret:', process.env.JWT_SECRET);
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        req.user = user as UserPayload;
        next();
    });
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.Role !== 'Admin') {
        return res.status(403).json({ message: 'Доступ запрещён. Только для Admin.' });
    }
    next();
};