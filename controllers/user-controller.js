const { User } = require('../models/user');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },

  // GET a single user by _id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },

  // PUT update user by _id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true, runValidators: true })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        // BONUS: Remove associated thoughts
        return Thought.deleteMany({ username: userData.username });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted' }))
      .catch(err => res.status(400).json(err));
  },

  // POST add friend to user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE remove friend from user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },
};

module.exports = userController;
