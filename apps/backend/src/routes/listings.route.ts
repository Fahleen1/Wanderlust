import {
  addListing,
  getAllListing,
  getListing,
} from '../controllers/listings.controller';
import express from 'express';

const router = express.Router();

router.get('/listings', getAllListing);
router.get('/listing/:id', getListing);

router.post('/listings/add', addListing);
export default router;
