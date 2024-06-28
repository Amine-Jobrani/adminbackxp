import Result from '../models/Result.js';
import Election from '../models/Election.js';


export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate({
      path: 'electionId',
      match: { isFinished: true },
      select: 'isFinished',
    }).populate('candidateId');
    

    const filteredResults = results.filter(result => result.electionId); 

    res.status(200).json(filteredResults);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving results', error });
  }
};