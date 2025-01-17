import { getAllListing, getListing } from '../controllers/listings.controller';
import express from 'express';

const router = express.Router();

router.get('/listings', getAllListing);
router.get('/listing/:id', getListing);
export default router;
