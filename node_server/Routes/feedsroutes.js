const express = require('express')
const router = express.Router()

 const feedsController = require('../Controllers/feedController')
 const authController = require('../Controllers/authController')
 
// ROUTES CHAINING

router.route('/')
    .get(authController.protect,feedsController.getFeeds)
    // .post(authController.protect,authController.filesToFeedsPath,feedsController.postFeed) 
    .post(authController.protect,authController.filesToSupportsPath,feedsController.postFeed) 


router.route('/:_id')
    .get(authController.protect,feedsController.getFeed)
    .patch(authController.protect,feedsController.patchFeed)
    .put(authController.protect,feedsController.putFeed)
    .delete(authController.protect,authController.restrict('admin'),feedsController.deleteFeed)// for single role

module.exports = router