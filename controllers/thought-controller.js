const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.status(400).json(err));
  },

  // GET a single thought by _id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // POST create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(thoughtData => {
        // Add thought id to user's thoughts array
        return User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thoughtData._id } }, { new: true });
      })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this username' });
        }
        res.json({ message: 'Thought created successfully' });
      })
      .catch(err => res.status(400).json(err));
  },

  // PUT update thought by _id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true, runValidators: true })
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE thought by _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        // Remove thought id from user's thoughts array
        return User.findOneAndUpdate({ username: thoughtData.username }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
      })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this username' });
        }
        return Reaction.deleteMany({ thoughtId: req.params.thoughtId });
      })
      .then(() => res.json({ message: 'Thought and associated reactions deleted' }))
      .catch(err => res.status(400).json(err));
  },

  // POST create a reaction to a thought
  createReaction(req, res) {
    Reaction.create(req.body)
      .then(reactionData => {
        return Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $push: { reactions: reactionData._id } },
          { new: true }
        );
      })
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json({ message: 'Reaction created successfully' });
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE remove a reaction by reactionId
  removeReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.params.reactionId } }, { new: true })
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        return Reaction.findOneAndDelete({ _id: req.params.reactionId });
      })
      .then(() => res.json({ message: 'Reaction removed successfully' }))
      .catch(err => res.status(400).json(err));
  },
};

module.exports = thoughtController;
