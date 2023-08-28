const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// Route: /api/users

// GET all users
router.route('/').get(getAllUsers);

// POST a new user
router.route('/').post(createUser);

// Route: /api/users/:userId

// GET a single user by _id
router.route('/:userId').get(getUserById);

// PUT update user by _id
router.route('/:userId').put(updateUser);

// DELETE user by _id
router.route('/:userId').delete(deleteUser);

// Route: /api/users/:userId/friends/:friendId

// POST add friend to user's friend list
router.route('/:userId/friends/:friendId').post(addFriend);

// DELETE remove friend from user's friend list
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
