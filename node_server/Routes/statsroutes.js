const express = require('express')
const router = express.Router()

 const statsController = require('../Controllers/statsController')
 const authController = require('../Controllers/authController')
 
// ROUTES CHAINING

router.route('/lateststats').get(authController.protect,statsController.latestStats,statsController.getStats)

router.route('/')
    .get(authController.protect,authController.restrict('admin'),statsController.getStats)

router.route('/:_id')
    .delete(authController.protect,authController.restrict('admin'),statsController.deleteStats)// for single role

module.exports = router