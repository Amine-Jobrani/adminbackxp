import express from "express";
import {
  getAllResults,
} from '../controllers/resultsController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';


const router = express.Router();



router.get("/",requireAuth, getAllResults);



export default router;
