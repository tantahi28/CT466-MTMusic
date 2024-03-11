const { sequelize, Model, DataTypes } = require('../../config/dbconfig');

class Favourite extends Model {}

Favourite.init(
  {
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
  },
  {
    sequelize,
    modelName: 'Favourite',
    tableName: 'favourite',
    underscored: false,
    timestamps: false,
  }
);


module.exports = Favourite;
