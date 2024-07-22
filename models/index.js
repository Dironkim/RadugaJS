const db = require('../database/postgres')
// порядок импортов важен для предотвращения circular dependency
// в изображении импортируется товар, в товаре импортируется категория - изображение->товар->категория
const Image = require('../models/Image')
const Product = require('../models/Product')
const Category = require('../models/Category')
// productTag после tag и product
const Tag = require('../models/Tag')
const ProductTag = require('../models/ProductTag')
// productColor после color и product
const Color = require('../models/Color')
const ProductColor = require('../models/ProductColor')

// связь 1:n категория-товары
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

// связь 1:n товар-изображения
Product.hasMany(Image, {
    foreignKey: 'product_id',
    as: 'images',
    onDelete: 'CASCADE',
})
Image.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
})

// связь n:m товары-теги
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' })
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' })

// связь n:m товары-цвета
Product.belongsToMany(Color, { through: ProductColor, foreignKey: 'product_id' })
Color.belongsToMany(Product, { through: ProductColor, foreignKey: 'color_id' })

//force:true - пересоздает таблицы
db.sync({force:false}).then(function () {
    console.log("Database Configured");
});

module.exports = {Product, Category, ProductTag, ProductColor, Image, Tag, Color}