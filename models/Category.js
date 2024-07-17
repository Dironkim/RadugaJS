const { DataTypes } = require('sequelize')
const db = require('../database/postgres')

const Category = db.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
    underscored: true
})
  

module.exports = Category;
  