const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{};

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "blog_post",
            key: "id"
        }
    },
    commenter_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
        }
    }
},{
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "comment",
    freezeTableName: true
});

module.exports = Comment;