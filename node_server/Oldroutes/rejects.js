// reject start
const express = require('express')
const router = express.Router()
const Reject = require('./collections/rejectSchema');
router.post('/createReject', async(req, res) => {
    try{
        const newReject = new Reject(req.body)
        let RejectData = await newReject.save()
        res.send(RejectData)
    }
    catch(error){
        console.log(error.message)
    }
})

router.get('/getRejects', async(req, res) => {
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



router.get('/getReject/:_id', async(req, res) => {
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


router.put('/updateReject/:_id', async(req, res) => {
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

router.delete('/deleteReject/:_id', async(req, res) => {
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
