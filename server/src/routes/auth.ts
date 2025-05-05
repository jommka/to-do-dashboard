import { Router, Response } from 'express';
import {authMiddleware, AuthRequest} from '../middleware/authMiddleware';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register.bind(userController));
router.post('/login',  userController.login.bind(userController));

router.get('/profile', authMiddleware, (req: AuthRequest, res: Response) => {
    res.json({
        message: 'Access granted',
        user: req.user,
    });
});

export default router;
