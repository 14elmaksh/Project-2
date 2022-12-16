const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BookLocation extends Model {}

BookLocation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id',
        unique: false,
      },
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'location',
        key: 'id',
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book_location',
  }
);

module.exports = BookLocation;