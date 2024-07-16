const {Product, Image, Tag} = require('../models/index')

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Image, as: 'images' },
                { model: Tag, as: 'tags' }
            ]
        });
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}
const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {
            include: [
                { model: Image, as: 'images' },
                { model: Tag, as: 'tags' }
            ]
        });
        if (!product) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}
  
const createProduct = async (req, res) => {
    const { category_id, name, short_description, long_description, color, price, tags } = req.body;
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);
    try {
        const product = await Product.create({
            category_id,
            name,
            short_description,
            long_description,
            color,
            price,
        });

        if (req.files) {
            const imagePromises = req.files.map(file =>
                Image.create({ product_id: product.id, image_url: `/uploads/${file.filename}` })
            );
            await Promise.all(imagePromises);
        }

        if (tags && tags.length > 0) {
            const tagInstances = await Tag.findAll({
                where: {
                    name: tags,
                }
            });
            await product.setTags(tagInstances);
        }

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { category_id, name, short_description, long_description, color, price, tags } = req.body;
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.update({
            category_id,
            name,
            short_description,
            long_description,
            color,
            price,
        });

        await Image.destroy({ where: { product_id: id } });
        if (req.files) {
            const imagePromises = req.files.map(file =>
                Image.create({ product_id: product.id, image_url: `/uploads/${file.filename}` })
            );
            await Promise.all(imagePromises);
        }
        if (tags && tags.length > 0) {
            const tagInstances = await Tag.findAll({
                where: {
                    name: tags,
                }
            });
            await product.setTags(tagInstances);
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}