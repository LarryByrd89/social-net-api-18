const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// Route: /api/thoughts

// GET all thoughts
router.route('/').get(getThoughts);

// POST create a new thought
router.route('/').post(createThought);

// Route: /api/thoughts/:thoughtId

// GET a single thought by _id
router.route('/:thoughtId').get(getThoughtById);

// PUT update thought by _id
router.route('/:thoughtId').put(updateThought);

// DELETE thought by _id
router.route('/:thoughtId').delete(deleteThought);

// Route: /api/thoughts/:thoughtId/reactions

// POST create a reaction to a thought
router.route('/:thoughtId/reactions').post(createReaction);

// DELETE remove a reaction by reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
