const express = require('express')
const authController = require('../Controllers/authController')

const router = express.Router()

 router.route('/signup').post(authController.signup)
 router.route('/login').post(authController.login)

 router.route('/forgotpassword').post(authController.forgotpassword)
 router.route('/resetpassword/:token').patch(authController.resetpassword)

 router.route('/')
    .get(authController.protect,authController.getUsers)


    router.route('/:_id')
    .put(authController.protect,authController.putUser)
    .patch(authController.protect,authController.patchUser)
    .get(authController.protect,authController.getAuser)
    .delete(authController.protect,authController.restrict('admin'),authController.deleteUser)// for multiple roles

 module.exports = router     