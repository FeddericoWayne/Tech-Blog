// imports User model
const { User } = require('../models');

// seed data
const user = [
    {
        username: "trixiemattel",
        password: "1234567"

    },
    {
        username: "katya",
        password: "7654321"
    }
];

// function to seed user data
const seedUsers = () =>{
    User.bulkCreate(user);
}

// exports function
module.exports = seedUsers;