"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const post_model_1 = require("./post.model");
class Comment extends sequelize_1.Model {
}
exports.Comment = Comment;
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    postId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: post_model_1.Post,
            key: 'id'
        }
    }
}, { sequelize: database_1.sequelize, modelName: 'comment' });
