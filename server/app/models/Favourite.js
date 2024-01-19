const { sequelize, DataTypes } = require('../../config/dbconfig');
const User = require('./User');
const Song = require('./Song');

const Favourite = sequelize.define('Favourite', {
  user_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true,
  },
  tenant_id: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: 'public',
    primaryKey: true,
  },
  app_id: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: 'public',
    primaryKey: true,
  },
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'favourite',
  underscored: false,
  timestamps: false,
});

Favourite.belongsTo(User, {
    foreignKey: ['user_id', 'tenant_id', 'app_id'],
    targetKey: ['user_id', 'tenant_id', 'app_id'],
  });

Favourite.belongsTo(Song, {
  foreignKey: 'song_id',
});

module.exports = Favourite;
