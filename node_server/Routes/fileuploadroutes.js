const express = require('express')
const router = express.Router()


 const fileUploadsController = require('../Controllers/fileUploadsController')
 const authController = require('../Controllers/authController')
 const upload = require('../Utils/filehandler')
 
// ROUTES CHAINING
router.route('/linkprofileimage')
    .put(authController.protect,upload.single('file'),fileUploadsController.linkProfileImage)
    .patch(authController.protect,upload.single('file'),fileUploadsController.linkProfileImage)


router.route('/unlinkprofileimage/:_id')
    .put(authController.protect,fileUploadsController.unlinkProfileImage)// for single role
    .patch(authController.protect,fileUploadsController.unlinkProfileImage)// for single role

module.exports = router