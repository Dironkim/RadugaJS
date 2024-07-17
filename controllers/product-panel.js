const { Product, Image, Category, Tag } = require('../models/index');

const renderPanel = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Image, as: 'images' },
                { model: Category, as: 'category' },
                { model: Tag, as: 'tags' }  
            ],
            order: [
                ['id', 'ASC'],
                [{ model: Image, as: 'images' }, 'id', 'ASC']
            ]
        });

        const tags = await Tag.findAll({ order: [['name', 'ASC']] });

        // Преобразование результатов для использования в шаблоне
        const productData = products.map(product => ({
            id: product.id,
            category_id: product.category_id,
            name: product.name,
            short_description: product.short_description,
            long_description: product.long_description,
            color: product.color,
            price: product.price,
            images: product.images.map(image => image.image_url),
            tags: product.tags.map(tag => tag.id)
        }));

        const tagData = tags.map(tag => ({
            id: tag.id,
            name: tag.name
        }));

        res.status(200).render('product-panel', { products: productData, tags: tagData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { renderPanel };
