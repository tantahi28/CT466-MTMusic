const { sequelize, Model, DataTypes } = require('../../config/dbconfig');
const User = require('./User');
const Genre = require('./Genre');
const Song = require('./Song');

class Playlist extends Model {}

Playlist.init(
  {
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    app_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: 'public',
    },
    tenant_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: 'public',
    },
    description: {
      type: DataTypes.TEXT,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Playlist',
    tableName: 'playlist',
    underscored: false,
    timestamps: false,
  }
);


module.exports = Playlist;
