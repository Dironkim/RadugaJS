const {  Category } = require('../models/index');

const renderPanel = async (req, res) => {
    try {

        const categories = await Category.findAll({ order: [['name', 'ASC']] });
        // Преобразование результатов для использования в шаблоне
        const categoryData = categories.map(category => ({
            id: category.id,
            name: category.name
        }));
        res.status(200).render('category-panel', {  categories: categoryData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { renderPanel };
