const { sequelize, Model, DataTypes } = require('../../config/dbconfig');

class Album extends Model {}

Album.init(
  {
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
    },
    image_path: {
      type: DataTypes.STRING,
    },
    is_vip: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Album',
    tableName: 'album',
    underscored: false,
    timestamps: false,
  }
);


module.exports = Album;
