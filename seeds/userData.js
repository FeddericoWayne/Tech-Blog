const { User } = require('../models');

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

const seedUsers = () =>{
    User.bulkCreate(user);
}

module.exports = seedUsers;