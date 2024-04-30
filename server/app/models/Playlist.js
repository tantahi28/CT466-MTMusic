const { sequelize, Model, DataTypes } = require('../../config/dbconfig');
const PlaylistItem = require('./PlaylistItem');


class Playlist extends Model {

}

Playlist.init(
  {
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
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
      defaultValue: 1
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
