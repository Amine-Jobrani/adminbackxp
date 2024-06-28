import express from "express";
import { requireAuth } from '../middlewares/authMiddleware.js';
import {
  getAllElections,
  createElection,
  getElectionById,
  updateElectionById,
  deleteElectionById
} from '../controllers/electionController.js';

const router = express.Router();

// CRUD operations for elections
router.get("/",requireAuth, getAllElections);

router.post("/",requireAuth, createElection);

router.get("/:id",requireAuth, getElectionById);

router.put("/:id",requireAuth, updateElectionById);

router.delete("/:id",requireAuth, deleteElectionById);

export default router;
