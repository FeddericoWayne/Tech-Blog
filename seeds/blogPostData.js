// imports BlogPost model
const { BlogPost } = require('../models');

// blogpost seed data
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

// function to seed blog posts
const seedPosts = () =>{
    BlogPost.bulkCreate(blogPost);
}

// exports function
module.exports = seedPosts;