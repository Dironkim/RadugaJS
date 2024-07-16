const { DataTypes } = require('sequelize')
const db = require('../database/postgres')
// const {Product} = require('./index.js')
const Product = require('../models/Product')

const Image = db.define('Image', {
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName:'images',
  timestamps: true,
})

module.exports = Image
