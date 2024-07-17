const {DataTypes} = require('sequelize')
const db = require('../database/postgres')
const Category = require('../models/Category')


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
    timestamps: true,
    underscored: true
})

module.exports = Product
