const { Thought, Reaction } = require('../models');

const reactionController = {
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

module.exports = reactionController;
