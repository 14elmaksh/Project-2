const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      defaultValue: '0.0',
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contactId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contact',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;
