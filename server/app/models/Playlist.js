import { Sequelize, DataTypes } from 'sequelize';
import User from './User'; 
import Genre from './Genre'; 
import Song from './Song'; 

const Playlist = Sequelize.define('Playlist', {
  user_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true,
  },
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
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
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'playlist',
  underscored: false,
  timestamps: false,
});

Playlist.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

Playlist.belongsTo(Genre, {
  foreignKey: 'genre_id',
});

Playlist.belongsTo(Song, {
  foreignKey: 'song_id',
});

export default Playlist;
