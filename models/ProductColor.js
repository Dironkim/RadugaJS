const {DataTypes} = require('sequelize')
const db = require('../database/postgres')
const Color = require('../models/Color')
const Product = require('../models/Product')

// модель для связи m:n товары - цвета
const ProductColor = db.define('productColor', {
    //оба этих поля - первичный ключ (автоматически)
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
      },
      onDelete: 'CASCADE', // при удалении товара или цвета, связь пропадает
    },
    color_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Color,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
}, {
    timestamps: true,
    underscored: true
})


module.exports = ProductColor