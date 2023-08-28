const router = require('express').Router();
const {
  createReaction,
  removeReaction,
} = require('../../controllers/reaction-controller');

// Route: /api/thoughts/:thoughtId/reactions

// POST create a reaction to a thought
router.route('/:thoughtId/reactions').post(createReaction);

// Route: /api/thoughts/:thoughtId/reactions/:reactionId

// DELETE remove a reaction by reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
