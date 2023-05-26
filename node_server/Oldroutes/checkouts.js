// checkout start
const express = require('express')
const router = express.Router()
const Checkout = require('./collections/checkoutSchema');
router.post('/createCheckout', async(req, res) => {
    try{
        const newCheckout = new Checkout(req.body)
        let CheckoutData = await newCheckout.save()
        res.send(CheckoutData)
    }
    catch(error){
        console.log(error.message)
    }
})

router.get('/getCheckouts', async(req, res) => {
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



router.get('/getCheckout/:_id', async(req, res) => {
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


router.put('/updateCheckout/:_id', async(req, res) => {
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

router.delete('/deleteCheckout/:_id', async(req, res) => {
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