import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.ACCESS_TOKEN, {
        expiresIn: '30d',
      });

      res.status(200).json({
        _id: admin._id,
        email: admin.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
