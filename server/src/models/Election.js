import mongoose from 'mongoose';

const electionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  electionDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,  // Add endDate field
    required: true,
  },
  candidateList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Election = mongoose.model('Election', electionSchema);

export default Election;
