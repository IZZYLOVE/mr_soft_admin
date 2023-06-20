const Support = require('../Models/supportModel')
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const UnlinkMultipleFiles = require('../Utils/UnlinkMultipleFiles')
const ProcessMultipleFilesArrayOfObjects = require('../Utils/ProcessMultipleFilesArrayOfObjects')



exports.getSupports = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Support.find(), req.query).filter().sort().limitfields().limitfields2().paginate()
 
    let supports = await features.query

    req.query.page && paginationCrossCheck(supports.length)

    res.status(200).json({ 
        status : "success",
        resource : "support",
        lenght : enquiries.length,
        data : enquiries
       })  
})

exports.postSupport = asyncErrorHandler(async (req, res, next) => {


    if(req.body){
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


// exports.getsupportByStack = asyncErrorHandler(async (req, res, next) => {
//     //allows us access to the aggregation pipeline
//     const mystack = req.params.stack
//     const support = await Support.aggregate([
//         {$unwind: '$stack'},
//         { $group: {
//             _id: '$stack',
//             supportCount: {$sum: 1},
//             support:{$push: '$name'}
//         }},
//         {$addFields: {stack: "$_id"}}, //adds a firld stack
//         {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
//         {$sort: {supportCount: -1}}, // sort in decending order by setting -1
//         { $match: {stack: mystack}},
//     ]) 

//     res.status(200).json({ 
//         status : "success",
//         resource : "support",
//         action : "aggregatation",
//         lenght : support.length,
//         data: support
//     }) 
// })


// exports.getsupportByTechnology = asyncErrorHandler(async (req, res, next) => {
//     //allows us access to the aggregation pipeline
//     const mytechnology = req.params.technology
//     const support = await Support.aggregate([
//         {$unwind: '$technology'},
//         { $group: {
//             _id: '$technology',
//             supportCount: {$sum: 1},
//             supports:{$push: '$name'}
//         }},
//         {$addFields: {technology: "$_id"}}, //adds a field technology
//         {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
//         {$sort: {supportCount: -1}}, // sort in decending order by setting -1
//         {$match: {technology: mytechnology}},


//     ]) 

//     res.status(200).json({ 
//         status : "success",
//         resource : "support",
//         action : "aggregatation",
//         lenght : support.length,
//         data: support
//     }) 
// })