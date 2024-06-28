import express from "express";
import multer from 'multer';
import { importCandidatesByElectionId } from '../controllers/candidateImportController.js';
const router = express.Router();
import { requireAuth } from '../middlewares/authMiddleware.js';




const upload = multer({ dest: 'uploads/' });

// Candidates import by election
router.post('/:electionId',requireAuth , upload.single('file'), importCandidatesByElectionId);



export default router;
