// imports Comment model
const { Comment } = require('../models');

// comment seed data
const comment = [
    {
        comment_text: "Comment 1",
        post_id: 1,
        commenter_id: 2

    },
    {
        comment_text: "Comment 2",
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