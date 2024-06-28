import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Middleware to require authentication
export const requireAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      next();
    } else {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};
