// middleware to check if the user is still logged in
// if not, redirects user to login page
const withAuth = (req, res, next) => {

    if (!req.session.logged_in) {
      res.redirect('/api/user/login');
    } else {
      next();
    }
  };
  
  // exports middleware
  module.exports = withAuth;