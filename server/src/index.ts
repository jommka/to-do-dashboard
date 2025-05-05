import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

const startServer = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();