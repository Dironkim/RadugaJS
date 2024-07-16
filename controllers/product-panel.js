const { Product, Image, Category } = require('../models/index');

const renderPanel = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Image, as: 'images' },
                { model: Category, as: 'category' }
            ],
            order: [
                ['id', 'ASC'],
                [{ model: Image, as: 'images' }, 'id', 'ASC']
            ]
        });

        // Преобразование результатов для использования в шаблоне
        const productData = products.map(product => ({
            id: product.id,
            category_id: product.category_id,
            name: product.name,
            short_description: product.short_description,
            long_description: product.long_description,
            color: product.color,
            price: product.price,
            images: product.images.map(image => image.image_url)
        }));

        res.status(200).render('product-panel', { products: productData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { renderPanel };
