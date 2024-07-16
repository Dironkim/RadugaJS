const {DataTypes} = require('sequelize')
const db = require('../database/postgres')
//const {Product, Tag} = require('./index.js')
const Tag = require('../models/Tag')
const Product = require('../models/Product')

const ProductTag = db.define('ProductTag', {
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
    tableName: 'product_tags',
    timestamps: true,
})

// Product.belongsToMany(Tag, { through: ProductTag })
// Tag.belongsToMany(Product, { through: ProductTag })



module.exports = ProductTag