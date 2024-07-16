const express = require('express')
const router = express.Router()
const db = require('../database/postgres')
const {Product} = require('../models/index')

router.get('/', (req, res) => {
      Product.findAll().then((products)=>{
        res.status(200).json(products)
      }).catch(err=>{
        console.error(err);
        res.status(500).send('Server error');
      })
})
module.exports = router