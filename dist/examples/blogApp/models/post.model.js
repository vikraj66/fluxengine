"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const user_model_1 = require("./user.model");
class Post extends sequelize_1.Model {
}
exports.Post = Post;
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_model_1.User,
            key: 'id'
        }
    }
}, { sequelize: database_1.sequelize, modelName: 'post' });
