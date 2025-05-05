import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
    id: number;
    email: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void>  => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ message: 'Authorization header missing' });
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Token missing' });
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        next();
    } catch (e) {
        console.error('JWT verification error:', e);
        res.status(401).json({ message: 'Unauthorized' });
    }
};