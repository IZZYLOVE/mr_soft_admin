const Support = require('../Models/supportModel')
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const UnlinkMultipleFiles = require('../Utils/UnlinkMultipleFiles')
const ProcessMultipleFilesArrayOfObjects = require('../Utils/ProcessMultipleFilesArrayOfObjects')
const HTMLspecialChars = require('../Utils/HTMLspecialChars')
const GetUserDetailsFromHeader = require('../Utils/GetUserDetailsFromHeader')



exports.getSupports = asyncErrorHandler(async (req, res, next) => {
    console.log('getSupports')

    let features = new ApiFeatures(Support.find(), req.query).filter().sort().limitfields().limitfields2().paginate()
 
    console.log('features')
    console.log(features)
    let supports = await features.query
    console.log('supports')
    console.log(supports)
    req.query.page && paginationCrossCheck(supports.length)

    res.status(200).json({ 
        status : "success",
        resource : "support",
        lenght : supports.length,
        data : supports
       })  
})

exports.postSupport = asyncErrorHandler(async (req, res, next) => {
    const testToken = req.headers.authorization
    const decodedToken =  await GetUserDetailsFromHeader(testToken)
    req.body.createdBy = decodedToken._id
    
    req.body = HTMLspecialChars(req.body)
    if(req.files){
    let filesArrayOfObjects = ProcessMultipleFilesArrayOfObjects(req)
    req.body.files = filesArrayOfObjects
    }
    
    const support = await Support.create(req.body) // create the support

    res.status(201).json({ 
        status : "success",
        resource : "support",
        support : "created",
        lenght : support.length,
        data : support
    })  
})


exports.getSupport = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
    const support = await Support.findById(req.params._id)
    if(!support){
        const error = new CustomError(`Support with ID: ${req.params._id} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }


    res.status(200).json({ 
        status : "success",
        resource : "support",
        support : "created",
        lenght : support.length,
        data : support
    })  
})

exports.patchSupport = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)
    const support = await Support.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!support){
        const error = new CustomError(`Support with ID: ${req.params._id} is not found`, 404)
        return next(error)
    }



    res.status(200).json({ 
        status : "success",
        resource : "support",
        action: "patch",
        lenght : support.length,
        data : support
    })  
})

exports.putSupport = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)
    const support = await Support.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!support){
        const error = new CustomError(`Support with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }



    res.status(200).json({ 
        status : "success",
        resource : "support",
        action : "put",
        lenght : support.length,
        data : support
    })  
})

exports.deleteSupport = asyncErrorHandler(async (req, res, next) => {
    const support = await Support.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
    if(!support){
        const error = new CustomError(`Support with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }

        //// unlink multiple files
        if(support.files){
            UnlinkMultipleFiles(support.files, req)
        }

    res.status(204).json({ 
        status : "success",
        resource : "support",
        message: 'deleted'
    })  
})


