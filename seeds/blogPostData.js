const { BlogPost } = require('../models');

const blogPost = [
    {
        blog_title: "Test 1",
        blog_text: "Test Text 1",
        author_id: 1

    },
    {
        blog_title: "Test 2",
        blog_text: "Test Text 2",
        author_id: 1
    }
];

const seedPosts = () =>{
    BlogPost.bulkCreate(blogPost);
}

module.exports = seedPosts;