import { Sequelize, DataTypes } from 'sequelize';

const Genre = Sequelize.define('Genre', {
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'genre',
  underscored: false,
  timestamps: false
});

export default {Genre};
