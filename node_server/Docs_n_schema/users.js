// users start
const express = require('express')
const router = express.Router()
// const session = express.session()

const CustomError = require('../Utils/CustomError')
const globalErrorHandler = require('../Utils/errorController')

const asyncErrorHandler = (func) => {
    func(req, res, next).catch(err => next(err))
} 

router.get('/', async(req, res) => {
    res.send("WELCOME TO USERS")
})

const User = require('./userSchema');

router.post('/userLogin', async(req, res) => {
    // res.json("hey there, you are logged in")
    const { username, password } = req.body;

})


// router.post('/userLogout', asyncErrorHandler(async(req, res) => {
//     const { username, password } = req.body; 
//     if(!username || !password){
//         const error = new CustomError()
//     } 
// } ))

// router.post('/userLogout', async(req, res) => {
//     const { username, password } = req.body; 
//     if(!username || !password){
//         const error = new CustomError()
//     } 

// })



router.post('/createUser', async(req, res, naxt) => { 
        const newUser = new User(req.body)
        let userData = await newUser.save()
        res.send(userData)
})


// router.post('/userLogout', asyncErrorHandler( async(req, res, naxt) => {
//     let users = await User.find()
//     return res.send({
//         message: 'Users',
//         data: users
//     })
// }))


router.get('/getUsers', async(req, res, naxt) => {
    try{
        let users = await User.find()
        return res.send({
            message: 'Users',
            data: users
        })
    }
    catch(error){
        const err = new CustomError(error.message, 400)
        next(err)
    }
})

router.get('/getUser/:_id', async(req, res, naxt) => {
    try{
        let user = await User.findById({'_id': req.params._id})
        // if(!user){
        //     const error = new CustomError('User with that ID is not found', 404)
        //     return next(error)
        // }
        return res.send({
            message: 'User',
            data: user
        })
    }
    catch(error){
        const err = new CustomError(error.message, 400)
        next(err)
    }
})


router.put('/updateUser/:_id', async(req, res, next) => {
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

router.delete('/deleteUser/:_id', async(req, res, naxt) => {
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
module.exports = router