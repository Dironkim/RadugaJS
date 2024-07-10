const express = require('express')
const router = express.Router()
const {
    getProducts,
    getSingleProduct,
    createProduct,
    createProductPostman,
    updateProduct,
    deleteProduct,
  } = require('../controllers/products')

router.get('/', getProducts)
router.post('/', createProduct)
router.post('/postman', createProductPostman)
router.get('/:id',getSingleProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router