const { DataTypes } = require('sequelize')
const db = require('../database/postgres')
const Product = require('../models/Product')

const Image = db.define('image', {
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
  timestamps: true,
  underscored: true
})

module.exports = Image
