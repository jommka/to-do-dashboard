import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';

const JWT_SECRET = process.env.JWT_SECRET as string;

export class UserController {
    async register(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (userExists.rows.length) {
                res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query(
                'INSERT INTO users (email, password) VALUES ($1, $2)',
                [email, hashedPassword]
            );

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Registration failed' });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (!user.rows.length) {
                res.status(400).json({ message: 'User not found' });
            }

            const isValid = await bcrypt.compare(password, user.rows[0].password);

            if (!isValid) {
                res.status(400).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Login failed' });
        }
    }
}