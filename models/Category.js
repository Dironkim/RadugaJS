const { DataTypes } = require('sequelize')
const db = require('../database/postgres')

// модель категорий
const Category = db.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
}, {
    timestamps: true, // временные пометки: когда создано и изменено, хранится в таблице, как два доп. поля
    underscored: true // внутри sequelize генерирует производные названия в snake_case
})
  
module.exports = Category;
  