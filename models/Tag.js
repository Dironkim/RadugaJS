const {DataTypes} = require('sequelize')
const db = require('../database/postgres')

const Tag = db.define('tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
    timestamps: true,
    underscored: true
})

module.exports = Tag