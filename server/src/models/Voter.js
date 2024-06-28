import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cinHash: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  cin: {
    type: String,
  },
});

const Voter = mongoose.model('Voter', voterSchema);

export default Voter;
