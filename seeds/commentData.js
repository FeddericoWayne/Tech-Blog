// imports Comment model
const { Comment } = require('../models');

// comment seed data
const comment = [
    {
        comment_text: "Amazing!",
        post_id: 1,
        commenter_id: 2

    },
    {
        comment_text: "Fantastic!",
        post_id: 2,
        commenter_id: 2
    }
];

// function to seed comment
const seedComments = () =>{
    Comment.bulkCreate(comment);
}

// exports function
module.exports = seedComments;