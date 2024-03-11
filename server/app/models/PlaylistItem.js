const { sequelize, Model, DataTypes } = require('../../config/dbconfig');
const Playlist = require('./Playlist');
const Song = require('./Song');

class PlaylistItem extends Model {}

PlaylistItem.init(
  {
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      }
  },
  {
    sequelize,
    modelName: 'PlaylistItem',
    tableName: 'playlist_item',
    underscored: false,
    timestamps: false,
  }
);

PlaylistItem.belongsTo(Playlist, {
  foreignKey: 'playlist_id',
});

PlaylistItem.belongsTo(Song, {
  foreignKey: 'song_id',
});

module.exports = PlaylistItem;
