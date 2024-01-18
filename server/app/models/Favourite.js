import { Sequelize, DataTypes } from 'sequelize';
import User from './User';
import Song from './Song';

const Favourite = Sequelize.define('Favourite', {
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

// Thiết lập quan hệ với bảng AllAuthRecipeUsers
Favourite.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

// Thiết lập quan hệ với bảng Song
Favourite.belongsTo(Song, {
  foreignKey: 'song_id',
});

export default Favourite;
