import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.controller';
import { verifyJwt } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import express from 'express';

const router = express.Router();

router.post('/user/register', asyncHandler(registerUser));
router.get('/user/login', asyncHandler(loginUser));

//Protected routes
router.post('/user/logout', verifyJwt, asyncHandler(logoutUser));

export default router;
