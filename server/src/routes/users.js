import express from 'express';
import multer from 'multer';
import { importUsersByElectionId, getAllUsers, getUserById } from '../controllers/userImportController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.get("/",requireAuth,  getAllUsers);


router.get("/:id",requireAuth, getUserById);




router.post('/:electionId',requireAuth,  upload.single('csvFile'), importUsersByElectionId);



export default router;
