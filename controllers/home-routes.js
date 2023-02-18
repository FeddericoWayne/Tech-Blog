const router = require('express').Router();
const { BlogPost, User } = require('../models');

// GET all existing blog posts for homepage
router.get('/', async (req, res) => {

  try {

    const blogPostData = await BlogPost.findAll({
      include:[{model: User, attributes: ['username']}]  
    });

    const blogPosts = blogPostData.map((blogPost) =>
    blogPost.get({ plain: true }));

    res.render('homepage',{ blogPosts, loggedIn: req.session.loggedIn })


  } catch(err) {

    res.status(400).json(err);
  }
});




module.exports = router;
