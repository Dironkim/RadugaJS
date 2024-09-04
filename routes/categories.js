const express = require('express')
const router = express.Router()

const multer = require('multer');
const upload = multer();

const {
    getCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  } = require('../controllers/categories')

router.get('/', getCategories)
router.get('/:id',getSingleCategory)
router.post('/',upload.none(), createCategory)
router.put('/:id',upload.none(), updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router