const express = require('express')
const authController = require('../Controllers/authController')

const router = express.Router()

 router.route('/signup').post(authController.signup)
 router.route('/login').post(authController.login)

 router.route('/forgotpassword').post(authController.forgotpassword)
 router.route('/verifyemail').post(authController.verifyEmail)
 router.route('/resetpassword/:token').patch(authController.resetpassword)
 router.route('/setusercourse/:_id').patch(authController.setusercourse)
//  router.route('/removeusercourse/:_id').patch(authController.removeusercourse)
//  router.route('/updateusercoursestatus/:_id').patch(authController.updateusercoursestatus)
 router.route('/approve/:_id').patch(authController.protect,authController.restrict('admin'),authController.approveUser)
 router.route('/setuserstatus/:_id').patch(authController.protect,authController.restrict('admin'),authController.setUserStatus)

 router.route('/myprofile')
    .get(authController.protect,authController.getMyProfile)

router.route('/:_id')
    .put(authController.protect,authController.putUser)
    .patch(authController.protect,authController.patchUser)
    .get(authController.protect,authController.getAuser)
    .delete(authController.protect,authController.restrict('admin'),authController.deleteUser)// for multiple roles


router.route('/')
    .get(authController.protect,authController.getUsers)


 module.exports = router     