const ContactMessage = require('../Models/contactMessageModel')
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const UnlinkMultipleFiles = require('../Utils/UnlinkMultipleFiles')
const HTMLspecialChars = require('../Utils/HTMLspecialChars')
    // req.body = HTMLspecialChars(req.body)




exports.getContactMessages = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(ContactMessage.find(), req.query).filter().sort().limitfields().limitfields2().paginate()

    let contactMessages = await features.query
    console.log('contactMessages')
    console.log(contactMessages)
    req.query.page && paginationCrossCheck(contactMessages.length)

    res.status(200).json({ 
        status : "success",
        resource : "contactMessages",
        lenght : contactMessages.length,
        data : contactMessages
       })  
})

exports.postContactMessage = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)

    const contactMessages = await ContactMessage.create(req.body) // create the support

    res.status(201).json({ 
        status : "success",
        resource : "contactMessages",
        lenght : contactMessages.length,
        data : contactMessages
    })  
})


exports.getContactMessage = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
    const contactMessages = await ContactMessage.findById(req.params._id)
    if(!contactMessages){
        const error = new CustomError(`Contact messages with ID: ${req.params._id} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }

    res.status(200).json({ 
        status : "success",
        resource : "contactMessages",
        lenght : contactMessages.length,
        data : contactMessages
    })  
})

exports.patchContactMessage = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
    req.body = HTMLspecialChars(req.body)

        const contactMessage = await ContactMessage.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
        if(!contactMessage){
            const error = new CustomError(`Contact message with ID: ${req.params._id} is not found`, 404)
            return next(error)
        }
        res.status(200).json({ 
            status : "success",
            resource : "contactMessage",
            action: "patch",
            lenght : contactMessage.length,
            data : contactMessage
        })  
})

exports.putContactMessage = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)

    // const movie = await movie.find({_id: req.param._id})
    const contactMessage = await ContactMessage.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!contactMessage){
        const error = new CustomError(`Contact message with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "contactMessage",
        action : "put",
        lenght : contactMessage.length,
        data : contactMessage
    })  
})


exports.deleteContactMessage = asyncErrorHandler(async (req, res, next) => {
    const contactMessages = await ContactMessage.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
    if(!contactMessages){
        const error = new CustomError(`Contact messages with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }

        //// unlink multiple files
        if(contactMessages.files){
            UnlinkMultipleFiles(contactMessages.files, req)
        }

    res.status(204).json({ 
        status : "success",
        resource : "contactMessages",
        message: 'deleted'
    })  
})

