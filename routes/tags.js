const express = require('express')
const router = express.Router()

const multer = require('multer');
const upload = multer();

const {
    getTags,
    getSingleTag,
    createTag,
    updateTag,
    deleteTag,
} = require('../controllers/tags')

router.get('/', getTags)
router.get('/:id',getSingleTag)
router.post('/',upload.none(), createTag)
router.put('/:id',upload.none(), updateTag)
router.delete('/:id', deleteTag)

module.exports = router