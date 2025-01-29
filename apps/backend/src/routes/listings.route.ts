import {
  addListing,
  getAllListing,
  getListing,
  removeListing,
  updateListing,
} from '../controllers/listings.controller';
import { verifyJwt } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import express from 'express';

const router = express.Router();

router.get('/', getAllListing);
router.get('/listing/:id', getListing);

router.post('/add', verifyJwt, asyncHandler(addListing));
router.put('/edit/:id', asyncHandler(updateListing));
router.delete('/:id', asyncHandler(removeListing));
export default router;
