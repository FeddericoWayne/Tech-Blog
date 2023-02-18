// imports User model
const { User } = require('../models');

// seed data
const user = [
    {
        username: "Fred Wang",
        email: "jackiew1120@hotmail.com",
        password: "123456"

    },
    {
        username: "lulu",
        email: "jackiew1120@gmail.com",
        password: "76565433"
    }
];

// function to seed user data
const seedUsers = () =>{
    User.bulkCreate(user);
}

// exports function
module.exports = seedUsers;