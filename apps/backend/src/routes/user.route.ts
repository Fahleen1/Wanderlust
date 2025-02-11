import {
  generateAccessAndRefreshToken,
  generateAuthTokens,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from '../controllers/user.controller';
import { verifyJwt } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import express from 'express';

const router = express.Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));

//Protected routes
router.post('/logout', verifyJwt, asyncHandler(logoutUser));
router.post('/refreshToken', asyncHandler(refreshAccessToken));
router.post('/generate-token', asyncHandler(generateAuthTokens));
export default router;
