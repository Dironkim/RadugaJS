const {DataTypes} = require('sequelize')
const db = require('../database/postgres')
const Tag = require('../models/Tag')
const Product = require('../models/Product')

const ProductTag = db.define('productTag', {
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
}, {
    timestamps: true,
    underscored: true
})


module.exports = ProductTag