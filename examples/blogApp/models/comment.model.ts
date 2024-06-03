import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Post } from './post.model';

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id'
    }
  }
}, { sequelize, modelName: 'comment' });

export { Comment };
