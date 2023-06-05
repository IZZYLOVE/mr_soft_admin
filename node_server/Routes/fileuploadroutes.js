const express = require('express')
const router = express.Router()


 const fileUploadsController = require('../Controllers/fileUploadsController')
 const authController = require('../Controllers/authController')
 const upload = require('../Utils/filehandler')
 
// ROUTES CHAINING

router.route('/singlefile')
    .get(authController.protect,fileUploadsController.getallSingleFiles)
    .post(authController.protect,upload.single('file'),fileUploadsController.singleFileUpload)
    .put(authController.protect,upload.single('file'),fileUploadsController.singleFileUpload)
    .patch(authController.protect,upload.single('file'),fileUploadsController.singleFileUpload)
    // .patch(authController.protect,upload.single('fileInputFormFieldname'),fileUploadsController.singleFileUpload)


router.route('/multiplefiles')
    .get(authController.protect,fileUploadsController.getallMultipleFiles)
    .post(authController.protect,upload.array('files'),fileUploadsController.multipleFilesUpload)
    .put(authController.protect,upload.array('files'),fileUploadsController.multipleFilesUpload)
    .patch(authController.protect,upload.array('files'),fileUploadsController.multipleFilesUpload)
    // .patch(authController.protect,upload.array('fileInputFormFieldname'),fileUploadsController.multipleFilesUpload)


router.route('/')
    // .get(authController.protect,authController.restrict('admin'),fileUploadsController.getStats)

router.route('/:_id')
    // .delete(authController.protect,authController.restrict('admin'),fileUploadsController.deleteStats)// for single role

module.exports = router