const { sequelize, Model, DataTypes } = require('../../config/dbconfig');

class User extends Model {}

User.init(
  {
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
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'all_auth_recipe_users',
    underscored: false,
    timestamps: false,
    primaryKey: ['app_id', 'tenant_id', 'user_id'],
  }
);

module.exports = User;
