// product start
const express = require('express')
const router = express.Router()
const Product = require('./collections/productSchema');
router.post('/createProduct', async(req, res) => {
    try{
        const newProduct = new Product(req.body)
        let ProductData = await newProduct.save()
        res.send(ProductData)
    }
    catch(error){
        console.log(error.message)
    }
})

router.get('/getProducts', async(req, res) => {
    try{
        let Products = await Product.find()
        return res.send({
            message: 'Products',
            data: Products
        })
    }
    catch(error){
        console.log(error.message)
    }
})



router.get('/getProduct/:_id', async(req, res) => {
    try{
        // let Product = await Product.findById({'_id': req.params.id})
        let Product = await Product.findById(req.params._id)
        return res.send({
            message: 'Product',
            data: Product
        })
    }
    catch(error){
        console.log(error.message)
    }
})


router.put('/updateProduct/:_id', async(req, res) => {
    const {name, gender, mail} = req.body
    try{
        let updateProduct = await Product.findByIdAndUpdate({'_id': req.params._id}, { name, gender, mail}, {new: true})
        return res.send({
            message: 'updated',
            data: updateProduct
        })
    }
    catch(error){
        console.log(error.message)
    }
})

router.delete('/deleteProduct/:_id', async(req, res) => {
    try{
        let deleteProduct = await Product.findByIdAndDelete({'_id': req.params._id})
        return res.send({
            message: 'deleted',
            data: deleteProduct 
        })
    }
    catch(error){
        console.log(error.message)
    }
})
// product end