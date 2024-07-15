const client = require('../database/postgres')

const getProducts = async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM products');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
}
const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        res.status(404).send('Product not found');
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
}
  
const createProduct = async (req, res) => {
    const { category_id, name, short_description, long_description, color, price } = req.body;
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);
    try {
        const result = await client.query(
            'INSERT INTO products (category_id, name, short_description, long_description, color, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [category_id, name, short_description, long_description, color, price]
        );

        const productId = result.rows[0].id;
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

        for (const url of imageUrls) {
            await client.query('INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)', [productId, url]);
        }

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { category_id, name, short_description, long_description, color, price } = req.body;
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);
    try {
        const result = await client.query(
            'UPDATE products SET category_id = $1, name = $2, short_description = $3, long_description = $4, color = $5, price = $6 WHERE id = $7 RETURNING *',
            [category_id, name, short_description, long_description, color, price, id]
        );

        await client.query('DELETE FROM product_images WHERE product_id = $1', [id]);
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

        for (const url of imageUrls) {
            await client.query('INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)', [id, url]);
        }

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
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