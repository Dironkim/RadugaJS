const client = require('../database/postgres')

const renderPanel = async (req, res) => {
    try {
        const result = await client.query(`
            SELECT p.*, pi.image_url
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.product_id
            ORDER BY p.id, pi.id
        `);
        
        const products = result.rows.reduce((acc, row) => {
            const product = acc.find(p => p.id === row.id);
            if (product) {
                if (row.image_url) {
                    product.images.push(row.image_url);
                }
            } else {
                acc.push({
                    id: row.id,
                    category_id: row.category_id,
                    name: row.name,
                    short_description: row.short_description,
                    long_description: row.long_description,
                    color: row.color,
                    price: row.price,
                    images: row.image_url ? [row.image_url] : []
                });
            }
            return acc;
        }, []);
        res.status(200).render('product-panel', { products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = {renderPanel}