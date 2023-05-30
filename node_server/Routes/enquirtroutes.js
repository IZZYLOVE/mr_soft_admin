const express = require('express')
const router = express.Router()

 const enquiryController = require('../Controllers/enquiryController')
 const authController = require('../Controllers/authController')
 


router.route('/enquiry-by-stack/:stack').get(authController.protect,enquiryController.getEnquiryByStack)

router.route('/enquiry-by-technology/:technology').get(authController.protect,enquiryController.getEnquiryByTechnology)



router.route('/')
    .get(authController.protect,enquiryController.getEnquiries)
    .post(authController.protect,enquiryController.postEnquiry) 

router.route('/:_id')
    .get(authController.protect,enquiryController.getEnquiry)
    .patch(authController.protect,enquiryController.patchEnquiry)
    .put(authController.protect,enquiryController.putEnquiry)
    .delete(authController.protect,authController.restrict('admin'),enquiryController.deleteEnquiry)// for single role

module.exports = router