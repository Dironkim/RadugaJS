const {DataTypes} = require('sequelize')
const db = require('../database/postgres')

// модель цветов
const Color = db.define('color', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
    timestamps: true,
    underscored: true
})

module.exports = Color