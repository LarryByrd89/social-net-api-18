const router = require('express').Router();
const userRoutes = require('./user');
const thoughtRoutes = require('./thoughts');
const reactionRoutes = require('./reaction');

// Prefix routes with their respective base paths
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
// Reactions are nested under thoughts
router.use('/thoughts', reactionRoutes); 

module.exports = router;
