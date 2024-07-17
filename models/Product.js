const {DataTypes} = require('sequelize')
const db = require('../database/postgres')
const Category = require('../models/Category')

// модель товара
const Product = db.define('product', {
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
        onDelete: 'SET NULL', // при удалении категории это поле принимает значение NULL
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
        type: DataTypes.DECIMAL(10, 2) // суммарно 10 знаков, из них 2 после запятой
    }
}, {
    timestamps: true,
    underscored: true
})

module.exports = Product
