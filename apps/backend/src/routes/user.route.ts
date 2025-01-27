import { registerUser } from '../controllers/user.controller';
import { asyncHandler } from '../utils/asyncHandler';
import express from 'express';

const router = express.Router();

router.post('/users/register', asyncHandler(registerUser));

export default router;
