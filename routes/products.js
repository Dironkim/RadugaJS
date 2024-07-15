const express = require('express')
const router = express.Router()

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  } = require('../controllers/products')

router.get('/', getProducts)
router.post('/',upload.array('images'), createProduct)
router.get('/:id',getSingleProduct)
router.put('/:id',upload.array('images'), updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router