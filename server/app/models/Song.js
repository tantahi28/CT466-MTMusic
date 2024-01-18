import { Sequelize, DataTypes } from 'sequelize';

const Song = Sequelize.define('Song', {
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true // Đặt thuộc tính tự tăng cho cột song_id
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    album_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Album', 
        key: 'album_id'
      }
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Genre',
        key: 'genre_id'
      }
    },
    audio_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_vip: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'song',
    underscored: false,
    timestamps: false
  });
  
export default {Song};