const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

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

module.exports = { User, BlogPost, Comment };