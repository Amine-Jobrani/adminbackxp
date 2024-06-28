import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  candidate_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  election_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: true,
  },
});

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;
