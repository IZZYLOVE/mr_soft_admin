const express = require('express')
const router = express.Router()

 const ratingController = require('../Controllers/ratingController')
 const authController = require('../Controllers/authController')
 
//PARAM MIDDLEWARE
//  router.param('_id', courseController.checkId)

// ROUTES CHAINING
// alias routin

router.route('/')
    .get(authController.protect,ratingController.getRatings)
    .post(authController.protect,ratingController.postRating) 

router.route('/:_id')
    .get(authController.protect,ratingController.getRating)
    .patch(authController.protect,ratingController.patchRating)
    .put(authController.protect,ratingController.putRating)
    .delete(authController.protect,authController.restrict('admin'),ratingController.deleteRating)// for single role

module.exports = router