const {DataTypes} = require('sequelize')
const db = require('../database/postgres')
//const {Category} = require('./index.js')
const Category = require('../models/Category')


const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Category,
          key: 'id',
        },
        allowNull: true, 
        onDelete: 'SET NULL', 
    },
    short_description: {
        type: DataTypes.TEXT,
    },
    long_description: {
        type: DataTypes.TEXT,
    },
    color: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    tableName: 'products',
    timestamps: true,
})

// Product.hasMany(Image, {
//     foreignKey: 'product_id',
//     as: 'images',
//     onDelete: 'CASCADE',
// })

module.exports = Product
