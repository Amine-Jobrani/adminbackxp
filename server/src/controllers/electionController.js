// controllers/electionsController.js
import Election from '../models/Election.js';


// Retrieve all elections
export const getAllElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.status(200).json(elections);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving elections', error });
  }
};

// Create a new election
export const createElection = async (req, res) => {
  try {
    const newElection = new Election(req.body);
    const savedElection = await newElection.save();
    res.status(201).json(savedElection);
  } catch (error) {
    res.status(500).json({ message: 'Error creating election', error });
  }
};

// Retrieve a specific election by ID
export const getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving election', error });
  }
};

// Update a specific election by ID
export const updateElectionById = async (req, res) => {
  try {
    const updatedElection = await Election.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedElection) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json(updatedElection);
  } catch (error) {
    res.status(500).json({ message: 'Error updating election', error });
  }
};

// Delete a specific election by ID
export const deleteElectionById = async (req, res) => {
  try {
    const deletedElection = await Election.findByIdAndDelete(req.params.id);
    if (!deletedElection) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json({ message: 'Election deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting election', error });
  }
};
