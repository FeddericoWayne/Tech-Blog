const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogPostRoutes = require('./blog-post-routes');

// user and blogpost routes
router.use('/user', userRoutes);
router.use('/blogpost',blogPostRoutes);

// exports router settings
module.exports = router;