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

AlbumItem.belongsTo(Album, {
  foreignKey: 'album_id',
});

AlbumItem.belongsTo(Song, {
  foreignKey: 'song_id',
});

module.exports = AlbumItem;
