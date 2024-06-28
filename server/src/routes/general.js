import express from "express";
import {
  fetchUser,
  getDashboardStats,
  signin,
  signup,
} from "../controllers/general_controller.js";
import { requireAuth } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.get("/user",requireAuth,  fetchUser);

export default router;
