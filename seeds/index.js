// imports required files and packages
const sequelize = require('../config/connection');
const seedPosts = require('./blogPostData');
const seedComments = require('./commentData');
const seedUsers = require('./userData');

async function seedDataBase() {

    // establish connection with database
    await sequelize.sync();

    // seeds user data
    await seedUsers();

    // seeds post data
    await seedPosts();

    // seeds comment data
    await seedComments();

};

// calls function to seed database
seedDataBase();



