const {sequelize,  Model, DataTypes} = require('../../config/dbconfig');
const AlbumItem = require('./AlbumItem');
const PlaylistItem = require('./PlaylistItem');
const Favourite = require('./Favourite')

class Song extends Model {
    static async delete(id) {
        try {
            await PlaylistItem.destroy({ where: { song_id: id } });

            await AlbumItem.destroy({ where: { song_id: id } });

            await Favourite.destroy({ where: { song_id: id } });

            await this.destroy({ where: { song_id: id } });

            return true; 
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while deleting the song and related items");
        }
    }
}

Song.init(
  {
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_id: {
      type: DataTypes.INTEGER,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1
    },
    audio_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_vip: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Song',
    tableName: 'song',
    underscored: false,
    timestamps: false,
  }
);


Song.hasMany(PlaylistItem, { onDelete: 'CASCADE', foreignKey: 'song_id' });
Song.hasMany(AlbumItem, { onDelete: 'CASCADE', foreignKey: 'song_id' });

module.exports = Song;
