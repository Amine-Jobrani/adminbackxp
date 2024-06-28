import fs from 'fs';
import csv from 'csv-parser';
import Voter from '../models/Voter.js';

export const importUsersByElectionId = async (req, res) => {
  const { electionId } = req.params;
  const users = [];

  try {
    fs.createReadStream(req.file.path)
      .pipe(csv({ separator: ',' })) // Change delimiter to comma
      .on('data', async (row) => {
        console.log('Row data:', row); // Log each row to debug

        // Check if password exists and is not empty
        if (row.password) {
          const user = {
            updateOne: {
              filter: { username: row.username },
              update: {
                username: row.username,
                firstName: row.firstName,
                lastName: row.lastName,
                email: row.email,
                cinHash: row.cinHash,
                phonenumber: row.phonenumber,
                password: row.password,
                dateOfBirth: new Date(row.dateOfBirth)
              },
              upsert: true // Insert the document if it does not exist
            }
          };
          users.push(user);
        } else {
          console.warn(`Skipping user import for ${row.username} due to missing password.`);
        }
      })
      .on('end', async () => {
        if (users.length > 0) {
          try {
            await Voter.bulkWrite(users);
            res.json({ message: 'Users imported successfully' });
          } catch (bulkWriteError) {
            res.status(500).json({ message: bulkWriteError.message });
          }
        } else {
          res.json({ message: 'No valid users to import.' });
        }
        fs.unlinkSync(req.file.path);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Voter.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Users by ElectionId
export const getUsersByElectionId = async (req, res) => {
    const { electionId } = req.params;
    
    try {
      const users = await Voter.find({ electionId: electionId });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get a specific user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await Voter.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
