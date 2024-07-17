const db = require('../database/postgres')
const Image = require('../models/Image')
const Product = require('../models/Product')
const Category = require('../models/Category')
const Tag = require('../models/Tag')
const ProductTag = require('../models/ProductTag')

Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products',
    onDelete: 'SET NULL' 
})
Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
    onDelete: 'SET NULL' 
})

Product.hasMany(Image, {
    foreignKey: 'product_id',
    as: 'images',
    onDelete: 'CASCADE',
})
Image.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
})

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' })
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' })


db.sync({force:false}).then(function () {
    console.log("Database Configured");
});
module.exports = {Product, Category, ProductTag, Image, Tag}