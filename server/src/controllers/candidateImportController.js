import fs from 'fs';
import csv from 'csv-parser';
import Candidate from '../models/Candidate.js';
import Election from '../models/Election.js'; // Import your Election model

export const importCandidatesByElectionId = async (req, res) => {
    const { electionId } = req.params;
    const candidates = [];

    try {
        // Fetch election details by electionId
        const election = await Election.findById(electionId);

        if (!election) {
            return res.status(404).json({ message: 'Election not found' });
        }

        // Process CSV file
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', async (row) => {
                const candidate = new Candidate({
                    name: row.name,
                    party: row.party,
                    biography: row.biography,
                    email: row.email,
                    photo: row.photo,
                    electionId: electionId,
                });
                candidates.push(candidate);
            })
            .on('end', async () => {
                try {
                    // Insert all candidates into the database
                    await Candidate.insertMany(candidates);

                    // Respond with success message
                    res.json({ message: 'Candidates imported successfully' });

                    // Delete the file after processing
                    fs.unlinkSync(req.file.path);
                } catch (error) {
                    res.status(500).json({ message: 'Failed to import candidates', error: error.message });
                }
            });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch election details', error: error.message });
    }
};

export const getElectionCandidates = async (req, res) => {
    const { electionId } = req.params;
    
    try {
      const candidates = await Candidate.find({ electionId: electionId });
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  