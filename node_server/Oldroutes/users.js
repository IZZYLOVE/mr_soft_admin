// users start
const express = require('express')
const router = express.Router()
const User = require('./collections/userSchema');

router.post('/createUser', async(req, res) => {
    try{
        const newUser = new User(req.body)
        let userData = await newUser.save()
        res.send(userData)
    }
    catch(error){
        console.log(error.message)
    }
})

router.get('/getUsers', async(req, res) => {
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



router.get('/getUser/:_id', async(req, res) => {
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


router.put('/updateUser/:_id', async(req, res) => {
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

router.delete('/deleteUser/:_id', async(req, res) => {
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