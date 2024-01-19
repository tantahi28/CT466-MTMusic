const { sequelize, DataTypes } = require('../../config/dbconfig');

const User = sequelize.define('User', {
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
  user_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'all_auth_recipe_users',
  underscored: false,
  timestamps: false,
});

module.exports = User;
