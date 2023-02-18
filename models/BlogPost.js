// imports required packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class BlogPost extends Model{};

// instantiates BlogPost model
BlogPost.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    blog_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blog_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
        }
    }
},
{
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "blog_post",
    freezeTableName: true
});

// exports BlogPost
module.exports = BlogPost;