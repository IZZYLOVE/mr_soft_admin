const express = require('express')
const app = express()
const cors = require('cors');
require("dotenv").config();

app.use(cors())

// const User = require('./routes/userSchema');
require('./db').connect()
//to allow us use json
app.use(express.json())
//to allow us parse variables/parameters in the url
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
    res.send("WELCOME")
})

// users start
const User = require('./routes/userSchema');

app.post('/createUser', async(req, res) => {
    try{
        const newUser = new User(req.body)
        let userData = await newUser.save()
        res.send(userData)
    }
    catch(error){
        console.log(error.message)
    }
})

app.get('/getUsers', async(req, res) => {
    try{
        let users = await User.find()
        return res.send({
            message: 'Users',
            data: users
        })
    }
    catch(error){
        console.log(error.message)
    }
})



app.get('/getUser/:_id', async(req, res) => {
    try{
        let user = await User.findById({'_id': req.params._id})
        return res.send({
            message: 'User',
            data: user
        })
    }
    catch(error){
        console.log(error.message)
    }
})


app.put('/updateUser/:_id', async(req, res) => {
    const {name, gender, mail} = req.body
    try{
        let updateUser = await User.findByIdAndUpdate({'_id': req.params.id}, { name, gender, mail}, {new: true})
        return res.send({
            message: 'updated',
            data: updateUser
        })
    }
    catch(error){
        console.log(error.message)
    }
})

app.delete('/deleteUser/:_id', async(req, res) => {
    try{
        let deleteUser = await User.findByIdAndDelete({'_id': req.params._id})
        return res.send({
            message: 'deleted',
            data: deleteUser 
        })
    }
    catch(error){
        console.log(error.message)
    }
})
// users end

// new collection
// product start
const Product = require('./routes/productSchema');
app.post('/createProduct', async(req, res) => {
    try{
        const newProduct = new Product(req.body)
        let ProductData = await newProduct.save()
        res.send(ProductData)
    }
    catch(error){
        console.log(error.message)
    }
})

app.get('/getProducts', async(req, res) => {
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



app.get('/getProduct/:_id', async(req, res) => {
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


app.put('/updateProduct/:_id', async(req, res) => {
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

app.delete('/deleteProduct/:_id', async(req, res) => {
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

// New collection
// sale start
const Sale = require('./routes/saleSchema');
app.post('/createSale', async(req, res) => {
    try{
        const newSale = new Sale(req.body)
        let SaleData = await newSale.save()
        res.send(SaleData)
    }
    catch(error){
        console.log(error.message)
    }
})

app.get('/getSales', async(req, res) => {
    try{
        let Sales = await Sale.find()
        return res.send({
            message: 'Sales',
            data: Sales
        })
    }
    catch(error){
        console.log(error.message)
    }
})



app.get('/getSale/:_id', async(req, res) => {
    try{
        // let Sale = await Sale.findById({'_id': req.params.id})
        let Sale = await Sale.findById(req.params._id)
        return res.send({
            message: 'Sale',
            data: Sale
        })
    }
    catch(error){
        console.log(error.message)
    }
})


app.put('/updateSale/:_id', async(req, res) => {
    const {name, gender, mail} = req.body
    try{
        let updateSale = await Sale.findByIdAndUpdate({'_id': req.params._id}, { name, gender, mail}, {new: true})
        return res.send({
            message: 'updated',
            data: updateSale
        })
    }
    catch(error){
        console.log(error.message)
    }
})

app.delete('/deleteSale/:_id', async(req, res) => {
    try{
        let deleteSale = await Sale.findByIdAndDelete({'_id': req.params._id})
        return res.send({
            message: 'deleted',
            data: deleteSale 
        })
    }
    catch(error){
        console.log(error.message)
    }
})

// sale end

// New collect
// reject start

const Reject = require('./routes/rejectSchema');
app.post('/createReject', async(req, res) => {
    try{
        const newReject = new Reject(req.body)
        let RejectData = await newReject.save()
        res.send(RejectData)
    }
    catch(error){
        console.log(error.message)
    }
})

app.get('/getRejects', async(req, res) => {
    try{
        let Rejects = await Reject.find()
        return res.send({
            message: 'Rejects',
            data: Rejects
        })
    }
    catch(error){
        console.log(error.message)
    }
})



app.get('/getReject/:_id', async(req, res) => {
    try{
        // let Reject = await Reject.findById({'_id': req.params.id})
        let Reject = await Reject.findById(req.params._id)
        return res.send({
            message: 'Reject',
            data: Reject
        })
    }
    catch(error){
        console.log(error.message)
    }
})


app.put('/updateReject/:_id', async(req, res) => {
    const {name, gender, mail} = req.body
    try{
        let updateReject = await Reject.findByIdAndUpdate({'_id': req.params._id}, { name, gender, mail}, {new: true})
        return res.send({
            message: 'updated',
            data: updateReject
        })
    }
    catch(error){
        console.log(error.message)
    }
})

app.delete('/deleteReject/:_id', async(req, res) => {
    try{
        let deleteReject = await Reject.findByIdAndDelete({'_id': req.params._id})
        return res.send({
            message: 'deleted',
            data: deleteReject 
        })
    }
    catch(error){
        console.log(error.message)
    }
})

// reject end

//New collection
// order start
const Order = require('./routes/orderSchema');
app.post('/createOrder', async(req, res) => {
    try{
        const newOrder = new Order(req.body)
        let OrderData = await newOrder.save()
        res.send(OrderData)
    }
    catch(error){
        console.log(error.message)
    }
})

app.get('/getOrders', async(req, res) => {
    try{
        let Orders = await Order.find()
        return res.send({
            message: 'Orders',
            data: Orders
        })
    }
    catch(error){
        console.log(error.message)
    }
})



app.get('/getOrder/:_id', async(req, res) => {
    try{
        // let Order = await Order.findById({'_id': req.params.id})
        let Order = await Order.findById(req.params._id)
        return res.send({
            message: 'Order',
            data: Order
        })
    }
    catch(error){
        console.log(error.message)
    }
})


app.put('/updateOrder/:_id', async(req, res) => {
    const {name, gender, mail} = req.body
    try{
        let updateOrder = await Order.findByIdAndUpdate({'_id': req.params._id}, { name, gender, mail}, {new: true})
        return res.send({
            message: 'updated',
            data: updateOrder
        })
    }
    catch(error){
        console.log(error.message)
    }
})

app.delete('/deleteOrder/:_id', async(req, res) => {
    try{
        let deleteOrder = await Order.findByIdAndDelete({'_id': req.params._id})
        return res.send({
            message: 'deleted',
            data: deleteOrder 
        })
    }
    catch(error){
        console.log(error.message)
    }
})

// order ends

// New collection
// checkout start
const Checkout = require('./routes/checkoutSchema');
app.post('/createCheckout', async(req, res) => {
    try{
        const newCheckout = new Checkout(req.body)
        let CheckoutData = await newCheckout.save()
        res.send(CheckoutData)
    }
    catch(error){
        console.log(error.message)
    }
})

app.get('/getCheckouts', async(req, res) => {
    try{
        let Checkouts = await Checkout.find()
        return res.send({
            message: 'Checkouts',
            data: Checkouts
        })
    }
    catch(error){
        console.log(error.message)
    }
})



app.get('/getCheckout/:_id', async(req, res) => {
    try{
        // let Checkout = await Checkout.findById({'_id': req.params.id})
        let Checkout = await Checkout.findById(req.params._id)
        return res.send({
            message: 'Checkout',
            data: Checkout
        })
    }
    catch(error){
        console.log(error.message)
    }
})


app.put('/updateCheckout/:_id', async(req, res) => {
    const {name, gender, mail} = req.body
    try{
        let updateCheckout = await Checkout.findByIdAndUpdate({'_id': req.params._id}, { name, gender, mail}, {new: true})
        return res.send({
            message: 'updated',
            data: updateCheckout
        })
    }
    catch(error){
        console.log(error.message)
    }
})

app.delete('/deleteCheckout/:_id', async(req, res) => {
    try{
        let deleteCheckout = await Checkout.findByIdAndDelete({'_id': req.params._id})
        return res.send({
            message: 'deleted',
            data: deleteCheckout 
        })
    }
    catch(error){
        console.log(error.message)
    }
})

// checkout ends

// New collection
// cancel starts
const Cancel = require('./routes/cancelSchema');
app.post('/createCancel', async(req, res) => {
    try{
        const newCancel = new Cancel(req.body)
        let CancelData = await newCancel.save()
        res.send(CancelData)
    }
    catch(error){
        console.log(error.message)
    }
})

app.get('/getCancels', async(req, res) => {
    try{
        let Cancels = await Cancel.find()
        return res.send({
            message: 'Cancels',
            data: Cancels
        })
    }
    catch(error){
        console.log(error.message)
    }
})



app.get('/getCancel/:_id', async(req, res) => {
    try{
        // let Cancel = await Cancel.findById({'_id': req.params.id})
        let Cancel = await Cancel.findById(req.params._id)
        return res.send({
            message: 'Cancel',
            data: Cancel
        })
    }
    catch(error){
        console.log(error.message)
    }
})


app.put('/updateCancel/:_id', async(req, res) => {
    const {name, gender, mail} = req.body
    try{
        let updateCancel = await Cancel.findByIdAndUpdate({'_id': req.params._id}, { name, gender, mail}, {new: true})
        return res.send({
            message: 'updated',
            data: updateCancel
        })
    }
    catch(error){
        console.log(error.message)
    }
})

app.delete('/deleteCancel/:_id', async(req, res) => {
    try{
        let deleteCancel = await Cancel.findByIdAndDelete({'_id': req.params._id})
        return res.send({
            message: 'deleted',
            data: deleteCancel 
        })
    }
    catch(error){
        console.log(error.message)
    }
})

// cancel ends
  

const port = process.env.PORT0 || process.env.PORT1 || process.env.PORT2 || process.env.PORT3 || process.env.PORT4

app.listen(port, () => {
    console.log(`server already running on port ${port} `)
    console.log(`...waiting for database connection...`)
})