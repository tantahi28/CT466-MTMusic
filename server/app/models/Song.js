const { sequelize, DataTypes } = require('../../config/dbconfig');
const Album = require('./Album'); 
const Genre = require('./Genre'); 

const Song = Sequelize.define('Song', {
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

Song.belongsTo(Genre, { foreignKey: 'genre_id' });
Song.belongsTo(Album, { foreignKey: 'album_id' });

module.exports = Song;
