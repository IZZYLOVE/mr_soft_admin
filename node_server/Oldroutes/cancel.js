// cancel starts
const express = require('express')
const router = express.Router()
const Cancel = require('./collections/cancelSchema');
router.post('/createCancel', async(req, res) => {
    try{
        const newCancel = new Cancel(req.body)
        let CancelData = await newCancel.save()
        res.send(CancelData)
    }
    catch(error){
        console.log(error.message)
    }
})

router.get('/getCancels', async(req, res) => {
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



router.get('/getCancel/:_id', async(req, res) => {
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


router.put('/updateCancel/:_id', async(req, res) => {
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

router.delete('/deleteCancel/:_id', async(req, res) => {
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
  