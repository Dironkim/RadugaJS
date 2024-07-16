const { DataTypes } = require('sequelize')
const db = require('../database/postgres')
const Product = require('../models/Product')

const Category = db.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
}, {
    tableName: 'categories',
    timestamps: true,
})
  

module.exports = Category;
  