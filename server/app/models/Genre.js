const { sequelize, Model, DataTypes } = require('../../config/dbconfig');
const Song = require('./Song');

class Genre extends Model {}

Genre.init(
  {
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Genre',
    tableName: 'genre',
    underscored: false,
    timestamps: false,
  }
);


module.exports = Genre;
