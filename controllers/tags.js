const {Tag} = require('../models/index')

// Методы обработки запросов: взаимодействие с базой данных через модели

// Получить все теги
const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

// Получить конкретный тег
const getSingleTag = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            res.status(404).send('Tag not found');
        } else {
            res.status(200).json(tag);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

// Создать новый тег
const createTag = async (req, res) => {
    // получение данных из тела запроса
    const { name } = req.body;
    // логирование
    console.log('Received body:', req.body);
    try {
        // создание модели тега
        const tag = await Tag.create({
            name
        });

        res.status(201).json(tag);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Удалить существующий и создать вместо него новый ("изменить")
const updateTag = async (req, res) => {
    // узнаем, какой тег выбран
    const { id } = req.params;
    // получение данных из тела запроса
    const { name } = req.body;
    // проверка
    console.log('Received body:', req.body);
    try {
        // находим тег по id, если существует
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        // обновляем модель тега
        await tag.update({
            name
        });
        // ответ на запрос - объект json
        res.json(tag); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Удалить существующий тег
const deleteTag = async (req, res) => {
    // получаем id удаляемого
    const { id } = req.params;
    try {
        // находим по id
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        // удаляем модель тега.
        await tag.destroy();
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getTags,
    getSingleTag,
    createTag,
    updateTag,
    deleteTag,
}