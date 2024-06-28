// controllers/userController.js
import Voter from '../models/Voter.js';

// Get all users (Voters)
export const getAllUsers = async (req, res) => {
  try {
    const users = await Voter.find({}, { password: 0 }); // Exclude password from response
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await Voter.findById(req.params.id, { password: 0 }); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
