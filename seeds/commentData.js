const { Comment } = require('../models');

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

const seedComments = () =>{
    Comment.bulkCreate(comment);
}

module.exports = seedComments;