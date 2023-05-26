// sale start
const express = require('express')
const router = express.Router()
const Sale = require('./collections/saleSchema');
router.post('/createSale', async(req, res) => {
    try{
        const newSale = new Sale(req.body)
        let SaleData = await newSale.save()
        res.send(SaleData)
    }
    catch(error){
        console.log(error.message)
    }
})

router.get('/getSales', async(req, res) => {
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



router.get('/getSale/:_id', async(req, res) => {
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


router.put('/updateSale/:_id', async(req, res) => {
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

router.delete('/deleteSale/:_id', async(req, res) => {
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