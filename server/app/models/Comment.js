const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig'); 

class Comment extends Model {}

Comment.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    tenant_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: 'public',
    },
    app_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: 'public',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    song_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comment',
    underscored: false,
    timestamps: false,
  }
);

module.exports = Comment;
