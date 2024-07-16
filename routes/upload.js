// const express = require('express')
// const router = express.Router()
// const {uploadMultiple} = require('../controllers/upload')
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append extension
//     }
// })
  
// const upload = multer({ storage: storage });


// router.get('/', (req, res) => {
//     res.render('upload');
//   })

// router.post('/',upload.array('files', 20),uploadMultiple)

// module.exports = router