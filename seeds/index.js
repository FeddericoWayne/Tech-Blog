// imports required files and packages
const sequelize = require('../config/connection');
const seedPosts = require('./blogPostData');
const seedComments = require('./commentData');
const seedUsers = require('./userData');

async function seedDataBase() {

    // establish connection with database
    await sequelize.sync();
    console.log("\n----- Database Synced -----\n")

    // seeds user data
    await seedUsers();
    console.log("\n----- Users Seeded -----\n")

    // seeds post data
    await seedPosts();
    console.log("\n----- Posts Seeded -----\n")

    // seeds comment data
    await seedComments();
    console.log("\n----- Comments Seeded -----\n")

};

// calls function to seed database
seedDataBase();



