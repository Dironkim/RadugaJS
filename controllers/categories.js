const {Category} = require('../models/index')

// Методы обработки запросов: взаимодействие с базой данных через модели

// Получить все категории
const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

// Получить конкретную категорию
const getSingleCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).send('Category not found');
        } else {
            res.status(200).json(category);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

// Создать новую категорию
const createCategory = async (req, res) => {
    // получение данных из тела запроса
    const { name, description } = req.body;
    // логирование
    console.log('Received body:', req.body);
    try {
        // создание модели категории
        const category = await Category.create({
            name,
            description
        });

        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Удалить существующую и создать вместо нее новую ("изменить")
const updateCategory = async (req, res) => {
    // узнаем, какая категория выбрана
    const { id } = req.params;
    // получение данных из тела запроса
    const { name, description } = req.body;
    // проверка
    console.log('Received body:', req.body);
    try {
        // находим категорию по id, если существует
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        // обновляем модель категории
        await category.update({
            name,
            description
        });
        // ответ на запрос - объект json
        res.json(category); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Удалить существующую категорию
const deleteCategory = async (req, res) => {
    // получаем id удаляемой
    const { id } = req.params;
    try {
        // находим по id
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        // удаляем модель категории.
        await category.destroy();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
}