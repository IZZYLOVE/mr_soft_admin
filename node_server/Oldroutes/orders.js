// order start
const express = require('express')
const router = express.Router()
const Order = require('./collections/orderSchema');
router.post('/createOrder', async(req, res) => {
    try{
        const newOrder = new Order(req.body)
        let OrderData = await newOrder.save()
        res.send(OrderData)
    }
    catch(error){
        console.log(error.message)
    }
})

router.get('/getOrders', async(req, res) => {
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



router.get('/getOrder/:_id', async(req, res) => {
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


router.put('/updateOrder/:_id', async(req, res) => {
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

router.delete('/deleteOrder/:_id', async(req, res) => {
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