import { Sequelize, DataTypes } from 'sequelize';
import Genre from './Genre'; 

const Album = Sequelize.define('Album', {
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING
  },
  image_path: {
    type: DataTypes.STRING
  },
  is_vip: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'album',
  underscored: false,
  timestamps: false
});

Album.belongsTo(Genre, {
  foreignKey: 'genre_id'
});

export default {Album}
