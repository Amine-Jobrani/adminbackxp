import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import Candidate from '../models/Candidate.js';

export const importCandidatesByElectionId = async (req, res) => {
  const { electionId } = req.params;
  const candidates = [];
  const imageDirectory = '../../images/'; // Directory where you want to save images

  // Ensure the image directory exists
  if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory, { recursive: true });
  }

  try {
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', async (row) => {
        // Decode the Base64 photo string
        const photoBuffer = Buffer.from(row.photo, 'base64');
        const photoFilename = `${row.email}_${Date.now()}.png`; // Create a unique filename
        const photoPath = path.join(imageDirectory, photoFilename);

        // Save the image to the filesystem
        fs.writeFileSync(photoPath, photoBuffer);

        const candidate = new Candidate({
          name: row.name,
          party: row.party,
          biography: row.biography,
          email: row.email,
          photo: photoPath, // Store the path to the photo
          electionId: electionId,
        });
        candidates.push(candidate);
      })
      .on('end', async () => {
        // Insert all candidates into the database
        await Candidate.insertMany(candidates);
        
        // Respond with success message
        res.json({ message: 'Candidates imported successfully' });
        
        // Delete the file after processing
        fs.unlinkSync(req.file.path);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
