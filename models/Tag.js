const {DataTypes} = require('sequelize')
const db = require('../database/postgres')

const Tag = db.define('Tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
    tableName: 'tags',
    timestamps: true,
})

module.exports = Tag