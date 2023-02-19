const router = require('express').Router();
const { User , BlogPost } = require('../../models');

// Creates a new user with hashed password
router.post('/signup', async (req,res)=>{

  try {

      // checks if username is already registered
      const usernameMatch = await User.findOne({where: {username: req.body.username}});

      // if username is already in use
      if (usernameMatch) {
        res.status(409).render('login');
        return;
      };

      if (!usernameMatch) {
        // sequelize creates new user using signup form input data
        const newUser = await User.create({
          username: req.body.username,
          password: req.body.password
        });

        // saves the user as logged in
        req.session.save(async () => {
        req.session.user_id = newUser.id;
        req.session.loggedIn = true;

          const blogPostData = await BlogPost.findAll({
            include:[{model: User, attributes: ['username']}]  
          })

          const blogPosts = blogPostData.map((blogPost) =>
          blogPost.get({ plain: true }));

          res.status(200).render('homepage',{
              blogPosts,
              loggedIn: req.session.loggedIn,
              userId: req.session.user_id
          })
        });

      };
    
  } catch(err) {

      res.status(400).json(err);
  }

});

// login route
router.get('/login', (req, res) => {

  // if user is already logged in
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
  
});

// user login requests
router.post('/login',async (req,res)=>{

  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    // if user not found
    if (!userData) {
      res.status(404).json({ message: 'User Not Found. Please try again!'});
      return;
    };

    // using bcrypt and custom Model method to check user password
    const correctPassword = await userData.checkPassword(req.body.password);

    // if password is incorrect
    if (!correctPassword) {
      res.status(401).json({ message: 'Incorrect Password. Please try again!'});
      return;
    };

    // saves user id and logged-in status
    req.session.save(async ()=>{
      req.session.user_id = userData.id;
      req.session.loggedIn = true;


      const blogPostData = await BlogPost.findAll({
        include:[{model: User, attributes: ['username']}]  
      })

      // takes user back to homepage as logged in user
      res.status(200).render('homepage',{
          blogPostData,
          loggedIn: req.session.loggedIn,
          userId: req.session.user_id
      })
    })



  } catch(err) {

    res.status(400).json(err);

  }


});

// dashboard route
router.get('/dashboard', async (req,res)=>{

  try {

    // if user is logged in
    if (req.session.loggedIn) {
      const blogPostData = await BlogPost.findAll({
        where: {author_id: req.session.user_id},
        include:[{model: User, attributes: ['username']}]  
      })
  
      const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true }));

      res.status(200).render('dashboard',{
        blogPosts, 
        loggedIn: req.session.loggedIn,
        userId: req.session.user_id
      })

    } else {
      res.status(408).render('login');
    }



    
} catch(err) {
    res.status(400).json(err);
}

});



// logout request
router.post('/logout', async(req, res) => {
  
  // logs user out if user is logged in; takes user back to homepage if user already logged out (due to cookie timed out)
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(408).render('homepage')
  }

});


// exports router
module.exports = router;