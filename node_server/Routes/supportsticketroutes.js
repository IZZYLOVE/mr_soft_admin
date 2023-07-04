const express = require('express')
const router = express.Router()

 const supportTicketController = require('../Controllers/supportTicketController')
 const authController = require('../Controllers/authController')
 
// ROUTES CHAINING

router.route('/')
    .get(authController.protect,supportTicketController.getSupportTickets)
    .post(authController.protect,supportTicketController.postSupportTicket)
    
router.route('/:_id')
    .get(authController.protect,supportTicketController.getSupportTicket)
    .patch(authController.protect,authController.restrict('admin'),supportTicketController.patchSupportTicket)
    .put(authController.protect,authController.restrict('admin'),supportTicketController.putSupportTicket)
    .delete(authController.protect,authController.restrict('admin'),supportTicketController.deleteSupportTicket)// for single role

module.exports = router