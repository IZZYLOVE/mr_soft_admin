const SupportTicket = require('../Models/supportTicketModel');
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const HTMLspecialChars = require('../Utils/HTMLspecialChars')
const GetUserDetailsFromHeader = require('../Utils/GetUserDetailsFromHeader')



exports.getSupportTickets = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(SupportTicket.find(), req.query).filter().sort().limitfields().limitfields2().paginate()
 
    let supportTickets = await features.query

    req.query.page && paginationCrossCheck(supportTickets.length)

    res.status(200).json({ 
        status : "success",
        resource : "supportTicket",
        lenght : supportTickets.length,
        data : supportTickets
       })  
})

exports.postSupportTicket = asyncErrorHandler(async (req, res, next) => {
    const testToken = req.headers.authorization
    const decodedToken =  await GetUserDetailsFromHeader(testToken)
    req.body.createdBy = decodedToken._id

    req.body = HTMLspecialChars(req.body)
    const supportTicket = await SupportTicket.create(req.body) // create the supportTicket
    res.status(201).json({ 
        status : "success",
        resource : "supportTicket",
        supportTicket : "created",
        lenght : supportTicket.length,
        data : supportTicket
    })  
})


exports.getSupportTicket = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
    const supportTicket = await SupportTicket.findById(req.params._id)
    if(!supportTicket){
        const error = new CustomError(`SupportTicket with ID: ${req.params._id} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "supportTicket",
        supportTicket : "created",
        lenght : supportTicket.length,
        data : supportTicket
    })  
})

exports.patchSupportTicket = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)
    const supportTicket = await SupportTicket.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!supportTicket){
        const error = new CustomError(`SupportTicket with ID: ${req.params._id} is not found`, 404)
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "supportTicket",
        action: "patch",
        lenght : supportTicket.length,
        data : supportTicket
    })  
})

exports.putSupportTicket = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)
    const supportTicket = await supportTicket.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!supportTicket){
        const error = new CustomError(`SupportTicket with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "supportTicket",
        action : "put",
        lenght : supportTicket.length,
        data : supportTicket
    })  
})

exports.deleteSupportTicket = asyncErrorHandler(async (req, res, next) => {
    const supportTicket = await SupportTicket.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
    if(!supportTicket){
        const error = new CustomError(`SupportTicket with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }
    res.status(204).json({ 
        status : "success",
        resource : "supportTicket",
        message: 'deleted'
    })  
})


