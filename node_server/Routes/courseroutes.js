const express = require('express')
const router = express.Router()

 const courseController = require('../Controllers/courseController')
 const authController = require('../Controllers/authController')
 
//PARAM MIDDLEWARE
//  router.param('_id', courseController.checkId)

// ROUTES CHAINING
// alias routin
router.route('/highest-rated').get(authController.protect,courseController.getHighestRated,courseController.getCourses)

router.route('/course-stats').get(authController.protect,courseController.getcourseStats)

router.route('/course-by-stack/:stack').get(authController.protect,courseController.getcoursesByStack)

router.route('/course-by-technology/:technology').get(authController.protect,courseController.getcoursesByTechnology)



router.route('/')
    .get(authController.protect,courseController.getCourses)
    .post(authController.protect,courseController.postCourse) 

router.route('/:_id')
    .get(authController.protect,courseController.getACourse)
    .patch(authController.protect,courseController.patchACourse)
    .put(authController.protect,courseController.putACourse)
    .delete(authController.protect,authController.restrict('admin'),courseController.deleteCourse)// for single role

module.exports = router