const router = require('express').Router();
const { BlogPost, User } = require('../models');

// GET all existing blog posts for homepage
router.get('/', async (req, res) => {

  try {

    // sequelize retrieves blog post data with autho info 
    const blogPostData = await BlogPost.findAll({
      include:[{model: User, attributes: ['username']}]  
    });

    // retrieves plain data 
    const blogPosts = blogPostData.map((blogPost) =>
    blogPost.get({ plain: true }));

    // handlebars renders homepage with all current blogposts
    res.render('homepage',{ blogPosts, loggedIn: req.session.loggedIn })


  } catch(err) {

    res.status(400).json(err);
  }
});


// exports router settings
module.exports = router;
