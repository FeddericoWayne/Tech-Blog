// imports sequelize Models
const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// Model Associations
User.hasMany(BlogPost,{
    foreignKey: "author_id",
    onDelete: "CASCADE"
});

BlogPost.belongsTo(User, {
    foreignKey: "author_id"
});

Comment.belongsTo(User,{
    foreignKey: "commenter_id"
});

BlogPost.hasMany(Comment,{
    foreignKey: "post_id",
    onDelete: "CASCADE"
});

Comment.belongsTo(BlogPost,{
    foreignKey: "post_id",
});

// exports Models with associations established
module.exports = { User, BlogPost, Comment };