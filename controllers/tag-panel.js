const {  Tag } = require('../models/index');

const renderPanel = async (req, res) => {
    try {

        const tags = await Tag.findAll({ order: [['name', 'ASC']] });
        // Преобразование результатов для использования в шаблоне
        const tagData = tags.map(tag => ({
            id: tag.id,
            name: tag.name
        }));
        res.status(200).render('tag-panel', {  tags: tagData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { renderPanel };
