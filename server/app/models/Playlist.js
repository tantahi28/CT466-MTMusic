const { sequelize, DataTypes } = require('../../config/dbconfig');
const User = require('./User');
const Genre = require('./Genre');
const Song = require('./Song');

const Playlist = sequelize.define('Playlist', {
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
    foreignKey: ['user_id', 'tenant_id', 'app_id'],
    targetKey: ['user_id', 'tenant_id', 'app_id'],
  });

Playlist.belongsTo(Genre, {
  foreignKey: 'genre_id',
});

Playlist.belongsTo(Song, {
  foreignKey: 'song_id',
});

module.exports = Playlist;
