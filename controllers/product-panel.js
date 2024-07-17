const { Product, Image, Category, Tag, Color } = require('../models/index');

const renderPanel = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Image, as: 'images' },
                { model: Category, as: 'category' },
                { model: Tag, as: 'tags' },
                { model: Color, as: 'colors' }  
            ],
            order: [
                ['id', 'ASC'],
                [{ model: Image, as: 'images' }, 'id', 'ASC']
            ]
        });

        const tags = await Tag.findAll({ order: [['name', 'ASC']] });
        const categories = await Category.findAll({ order: [['name', 'ASC']] });
        const colors = await Color.findAll({order: [['name', 'ASC']] })

        // Преобразование результатов для использования в шаблоне
        const productData = products.map(product => ({
            id: product.id,
            category_id: product.category_id,
            name: product.name,
            short_description: product.short_description,
            long_description: product.long_description,
            price: product.price,
            images: product.images.map(image => image.image_url),
            tags: product.tags.map(tag => tag.id),
            colors: product.colors.map(color => color.id)
        }));

        const tagData = tags.map(tag => ({
            id: tag.id,
            name: tag.name
        }));
        const colorData = colors.map(color => ({
            id: color.id,
            name: color.name
        }));
        const categoryData = categories.map(category => ({
            id: category.id,
            name: category.name
        }));
        res.status(200).render('product-panel', { products: productData, tags: tagData, categories: categoryData, colors: colorData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { renderPanel };
