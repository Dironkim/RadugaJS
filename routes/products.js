const express = require('express')
const router = express.Router()

const multer = require('multer');
// для возможности сохранения прикрепленных изображений
const upload = multer({ dest: 'uploads/' });
const {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  } = require('../controllers/products')

router.get('/', getProducts)
router.get('/:id',getSingleProduct)
// в этих запросах можно прикрепить файлы
router.post('/',upload.array('images'), createProduct)
router.put('/:id',upload.array('images'), updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router