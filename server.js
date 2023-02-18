// imports necessary packages
// express
const express = require('express');
// path
const path = require('path');
// express session
const session = require('express-session');
// handlebars
const exphbs = require('express-handlebars');
// Initializes Sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// api routes for requests
const routes = require('./controllers');
// for connection to the database
const sequelize = require('./config/connection');
// custom helpers
const helpers = require('./utils/helpers');

// instantiates express
const app = express();
// localhost PORT
const PORT = process.env.PORT || 3001;

// Sets up session and connect to our Sequelize database
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// makes express use session middleware
app.use(session(sess));

// sets up handlebar as view engine
const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turns on routers
app.use(routes);

// syncs to database via sequelize and turns on server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
