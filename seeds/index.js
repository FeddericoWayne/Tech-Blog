// bulkCreate data to seed database
const sequelize = require('../config/connection');
const seedPosts = require('./blogPostData');
const seedComments = require('./commentData');
const seedUsers = require('./userData');

async function seedDataBase() {

    await sequelize.sync();

    await seedUsers();

    await seedPosts();

    await seedComments();





};

seedDataBase();



