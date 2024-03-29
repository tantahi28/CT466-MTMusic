const { sequelize, Model, DataTypes } = require('../../config/dbconfig');
const Album = require('./Album');
const Song = require('./Song');

class AlbumItem extends Model {}

AlbumItem.init(
  {
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE'
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    }
  },
  {
    sequelize,
    modelName: 'AlbumItem',
    tableName: 'album_item',
    underscored: false,
    timestamps: false,
  }
);

module.exports = AlbumItem;
