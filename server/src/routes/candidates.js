import express from "express";
import multer from 'multer';
import { importCandidatesByElectionId, getElectionCandidates } from '../controllers/candidateImportController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });


router.post('/:electionId', requireAuth, upload.single('file'), importCandidatesByElectionId);


router.get('/:electionId/candidates', requireAuth, getElectionCandidates);

export default router;
