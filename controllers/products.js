const {Product, Image, Tag, Color} = require('../models/index')

// Методы обработки запросов: взаимодействие с базой данных через модели

// Получить все товары + второстепенные таблицы
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Image, as: 'images' },
                { model: Tag, as: 'tags' },
                { model: Color, as: 'colors' }
            ]
        });
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

// Получить конкретный товар + привязанные к нему второстепенные
const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {
            include: [
                { model: Image, as: 'images' },
                { model: Tag, as: 'tags' },
                { model: Color, as: 'colors' }
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

// Создать новый товар
const createProduct = async (req, res) => {
    // получение данных из тела запроса
    const { category_id, name, short_description, long_description, price, tags, colors } = req.body;
    // логирование
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);
    try {
        // создание модели товара
        const product = await Product.create({
            category_id,
            name,
            short_description,
            long_description,
            price,
        });
        // если к запросу прикреплены изображения, то загрузить их в /uploads
        if (req.files) {
            const imagePromises = req.files.map(file =>
                Image.create({ product_id: product.id, image_url: `/uploads/${file.filename}` })
            );
            await Promise.all(imagePromises);
        }
        // сохранение выбранных тегов (создание моделей ProductTag)
        if (tags && tags.length > 0) {
            const tagIds = tags.map(tag => parseInt(tag));
            await product.setTags(tagIds);
        }
        // сохранение выбранных цветов (создание моделей ProductColor)
        if (colors && colors.length > 0) {
            const colorIds = colors.map(color => parseInt(color));
            await product.setColors(colorIds);
        }

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Удалить существующий и создать вместо него новый ("изменить")
const updateProduct = async (req, res) => {
    // узнаем, какой товар выбран
    const { id } = req.params;
    // получение данных из тела запроса
    const { category_id, name, short_description, long_description, price, tags, colors } = req.body;
    // проверка
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);
    try {
        // находим товар по id, если существует
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // обновляем модель товара
        await product.update({
            category_id,
            name,
            short_description,
            long_description,
            price,
        });
        // удаляем привязанные к товару изображения
        await Image.destroy({ where: { product_id: id } });
        // если прикреплены новые, добавляем их
        if (req.files) {
            const imagePromises = req.files.map(file =>
                Image.create({ product_id: product.id, image_url: `/uploads/${file.filename}` })
            );
            await Promise.all(imagePromises);
        }
        // сохранение выбранных тегов (создание моделей ProductTag)
        if (tags && tags.length > 0) {
            const tagIds = tags.map(tag => parseInt(tag));
            await product.setTags(tagIds);
        }
        // сохранение выбранных цветов (создание моделей ProductColor)
        if (colors && colors.length > 0) {
            const colorIds = colors.map(color => parseInt(color));
            await product.setColors(colorIds);
        }
        // ответ на запрос - объект json
        res.json(product); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Удалить существующий товар
const deleteProduct = async (req, res) => {
    // получаем id удаляемого
    const { id } = req.params;
    try {
        // находим по id
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // удаляем модель товара. Связанные второстепенные удаляются каскадно (Image, ProductTag, ProductColor)
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