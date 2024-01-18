import { Sequelize, DataTypes } from 'sequelize';

const User = Sequelize.define('User', {
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


export default User;
