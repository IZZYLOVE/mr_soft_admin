const express = require('express')
const router = express.Router()

 const contactMessageController = require('../Controllers/contactMessageController')
 const authController = require('../Controllers/authController')

 
// ROUTES CHAINING

router.route('/')
    .get(authController.protect,authController.restrict('admin'),contactMessageController.getContactMessages)
    .post(contactMessageController.postContactMessage) //allows anyone to messeage admin

router.route('/:_id')
    .get(authController.protect,authController.restrict('admin'),contactMessageController.getContactMessage)
    .delete(authController.protect,authController.restrict('admin'),contactMessageController.deleteContactMessage)// for single role

module.exports = router