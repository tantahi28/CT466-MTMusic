const { sequelize, Model, DataTypes } = require('../../config/dbconfig');

class PlaylistItem extends Model {}

PlaylistItem.init(
  {
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE'
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

module.exports = PlaylistItem;
