let {products} = require('../database/mock')

const getProducts = (req, res) => {
    res.status(200).json({ success: true, data: products })
}
const getSingleProduct = (req,res)=> {
    const { id } = req.params
    res.status(200).json({success:true,product:products.find((product) => product.id === Number(id))})
}
  
const createProduct = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res
        .status(400)
        .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).send({ success: true, product: name })
}

  
const createProductPostman = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res
        .status(400)
        .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).send({ success: true, products: [...products, name] })
}

const updateProduct = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const product = products.find((product) => product.id === Number(id))

    if (!product) {
        return res
        .status(404)
        .json({ success: false, msg: `no product with id ${id}` })
    }
    const newProducts = products.map((product) => {
        if (product.id === Number(id)) {
        product.name = name
        }
        return product
    })
    res.status(200).json({ success: true, data: newProducts })
}

const deleteProduct = (req, res) => {
    const product = products.find((product) => product.id === Number(req.params.id))
    if (!product) {
        return res
        .status(404)
        .json({ success: false, msg: `no product with id ${req.params.id}` })
    }
    const newProducts = products.filter(
        (product) => product.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data: newProducts })
}

module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    createProductPostman,
    updateProduct,
    deleteProduct,
}