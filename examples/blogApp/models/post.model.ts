import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { User } from './user.model';

class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, { sequelize, modelName: 'post' });

export { Post };
