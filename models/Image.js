const { DataTypes } = require('sequelize')
const db = require('../database/postgres')
const Product = require('../models/Product')

// модель изображений
const Image = db.define('image', {
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      // внешний ключ на поле id в модели товара
      model: Product,
      key: 'id',
    },
    onDelete: 'CASCADE', // при удалении товара, ассоциированные с ним изображения тоже удалятся
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
