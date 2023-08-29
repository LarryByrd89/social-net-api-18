const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteSingleUser,
    createUsersFriend,
    deleteUsersFriend
} = require('../../controllers/user-controller');

// Routes user
router.route('/').get(getUsers).post(createUser);
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteSingleUser);
router.route('/:userId/friends/:friendId')
    .post(createUsersFriend)
    .delete(deleteUsersFriend);

module.exports = router;
