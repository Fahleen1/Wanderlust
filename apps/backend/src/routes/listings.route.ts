import { getAllListing } from '../controllers/listings.controller';
import express from 'express';

const router = express.Router();

router.get('/listings', getAllListing);
export default router;
