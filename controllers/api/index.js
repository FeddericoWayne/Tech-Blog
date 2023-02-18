const router = require('express').Router();

const userRoutes = require('./user-routes');

const blogPostRoutes = require('./blog-post-routes');

router.use('/user', userRoutes);
router.use('/blogpost',blogPostRoutes);

module.exports = router;