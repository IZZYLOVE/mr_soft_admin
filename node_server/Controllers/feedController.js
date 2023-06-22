const Feed = require('../Models/FeedModel');
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const UnlinkMultipleFiles = require('../Utils/UnlinkMultipleFiles')
const ProcessMultipleFilesArrayOfObjects = require('../Utils/ProcessMultipleFilesArrayOfObjects')



exports.getFeeds = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Feed.find(), req.query).filter().sort().limitfields().limitfields2().paginate()
 
    let feeds = await features.query

    req.query.page && paginationCrossCheck(feeds.length)

    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        lenght : feeds.length,
        data : feeds
       })  
})

exports.postFeed = asyncErrorHandler(async (req, res, next) => {

    console.log('req.body postFeed')
    console.log(req.body)

    console.log('req.files postFeed b4 If ')
    console.log(req.files)

    if(req.body){
        console.log('req.files postFeed b4Process')
        console.log(req.files)
        let filesArrayOfObjects = ProcessMultipleFilesArrayOfObjects(req)
        console.log('req.files postFeed AftaProvess')
        console.log(req.files)
        req.body.files = filesArrayOfObjects
    }

    const feed = await Feed.create(req.body) // create the feed
    res.status(201).json({ 
        status : "success",
        resource : "feed",
        feed : "created",
        lenght : feed.length,
        data : feed
    })  
})


exports.getFeed = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
    const feed= await Feed.findById(req.params._id)
    if(!feed){
        const error = new CustomError(`Feed with ID: ${req.params._id} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "feed",
        feed : "created",
        lenght : feed.length,
        data : feed
    })  
})


exports.patchFeed = asyncErrorHandler(async (req, res, next) => {
    const feed = await Feed.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!feed){
        const error = new CustomError(`Feed with ID: ${req.params._id} is not found`, 404)
        return next(error)
    }


    res.status(200).json({ 
        status : "success",
        resource : "feed",
        action: "patch",
        lenght : feed.length,
        data : feed
    })  
})


exports.putFeed = asyncErrorHandler(async (req, res, next) => {
    const feed = await Feed.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!feed){
        const error = new CustomError(`Feed with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }


    res.status(200).json({ 
        status : "success",
        resource : "feed",
        action : "put",
        lenght : feed.length,
        data : feed
    })  
})


exports.deleteFeed = asyncErrorHandler(async (req, res, next) => {
    const feed = await Feed.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
    if(!feed){
        const error = new CustomError(`Feed with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }

    //// unlink multiple files
    if(support.files){
        UnlinkMultipleFiles(Feed.files, req)
    }

    res.status(204).json({ 
        status : "success",
        resource : "feed",
        message: 'deleted'
    })  
})


// exports.getfeedByStack = asyncErrorHandler(async (req, res, next) => {
//     //allows us access to the aggregation pipeline
//     const mystack = req.params.stack
//     const feed = await Feed.aggregate([
//         {$unwind: '$stack'},
//         { $group: {
//             _id: '$stack',
//             feedCount: {$sum: 1},
//             feed:{$push: '$name'}
//         }},
//         {$addFields: {stack: "$_id"}}, //adds a firld stack
//         {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
//         {$sort: {feedCount: -1}}, // sort in decending order by setting -1
//         { $match: {stack: mystack}},
//     ]) 

//     res.status(200).json({ 
//         status : "success",
//         resource : "feed",
//         action : "aggregatation",
//         lenght : feed.length,
//         data: feed
//     }) 
// })


// exports.getEnquiryByTechnology = asyncErrorHandler(async (req, res, next) => {
//     //allows us access to the aggregation pipeline
//     const mytechnology = req.params.technology
//     const enquiry = await Enquiry.aggregate([
//         {$unwind: '$technology'},
//         { $group: {
//             _id: '$technology',
//             enquiryCount: {$sum: 1},
//             enquirys:{$push: '$name'}
//         }},
//         {$addFields: {technology: "$_id"}}, //adds a field technology
//         {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
//         {$sort: {enquiryCount: -1}}, // sort in decending order by setting -1
//         {$match: {technology: mytechnology}},
//     ]) 

//     res.status(200).json({ 
//         status : "success",
//         resource : "enquiry",
//         action : "aggregatation",
//         lenght : enquiry.length,
//         data: enquiry
//     }) 
// })