const router = require('express').Router();
const thoughtRoutes = require('./routes/thought-routes');
const userRoutes = require('./routes/user-routes');
const reactionRoutes = require('./reaction-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
