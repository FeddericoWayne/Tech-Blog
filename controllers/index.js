const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

// home routes and api routes 
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// exports router settings
module.exports = router;