const Enquiry = require('../Models/enquiryModel');
const Stats = require('./../Models/statsModal')
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const CustomErrorHandler = require('../Utils/CustomError')
const paginationCrossCheck = require('../Utils/paginationCrossCheck')



exports.getEnquiries = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Enquiry.find(), req.query).filter().sort().limitfields().limitfields2().paginate()
 
    let enquiries = await features.query

    req.query.page && paginationCrossCheck(enquiries.length)

    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        lenght : enquiries.length,
        data : enquiries
       })  
})

exports.postEnquiry = asyncErrorHandler(async (req, res, next) => {

    // UPDATE OR CREATE STATS STARTS
    let listEnquiry = (await Enquiry.find({email: req.body.email})).length

    console.log('listEnquiry')
    console.log(listEnquiry)

    if(listEnquiry < 1){// this is a new individual, hence a valid prospect
        let DATE = new Date()
        let YY = DATE.getFullYear()
        let mm = String(DATE).split(' ')[1] // to get th second element of the generated array
        let thisMonth = `${mm}/${YY}`

        // Add the following two fields to the request body
        req.body.prospect = true
        req.body.month = thisMonth

        let stats = await Stats.findOne({month: thisMonth})
        console.log('stats')
        console.log(stats)
        if(stats){
            //Update stats
            console.log('Update stats')
            stats.enquiryCount += 1
            stats.updated = Date.now()
            stats.save()// we want to allow validation

            console.log('updared stats')
            console.log(stats)
        }
        else{
            //Create stats
            console.log('Create stats')
            let newStats = {
                "month": thisMonth,
                "enquiryCount": 1
            }

            const newstats = await Stats.create(newStats)
            console.log('newstats')
            console.log(newstats)
        }
    }
    // UPDATE OR CREATE STATS ENDS


    const enquiry = await Enquiry.create(req.body) // create the enquiry
    res.status(201).json({ 
        status : "success",
        resource : "enquiry",
        enquiry : "created",
        lenght : enquiry.length,
        data : enquiry
    })  
})


exports.getEnquiry = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
    const enquiry = await Enquiry.findById(req.params._id)
    if(!enquiry){
        const error = new CustomError(`Enquiry with ID: ${req.params._id} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        enquiry : "created",
        lenght : enquiry.length,
        data : enquiry
    })  
})

exports.patchEnquiry = asyncErrorHandler(async (req, res, next) => {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!enquiry){
        const error = new CustomError(`Enquiry with ID: ${req.params._id} is not found`, 404)
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        action: "patch",
        lenght : enquiry.length,
        data : enquiry
    })  
})

exports.putEnquiry = asyncErrorHandler(async (req, res, next) => {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!enquiry){
        const error = new CustomError(`Enquiry with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        action : "put",
        lenght : enquiry.length,
        data : enquiry
    })  
})

exports.deleteEnquiry = asyncErrorHandler(async (req, res, next) => {
    const enquiry = await Enquiry.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
    if(!enquiry){
        const error = new CustomError(`Enquiry with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }
    res.status(204).json({ 
        status : "success",
        resource : "enquiry",
        message: 'deleted'
    })  
})


exports.getEnquiryByStack = asyncErrorHandler(async (req, res, next) => {
    //allows us access to the aggregation pipeline
    const mystack = req.params.stack
    const enquiry = await Enquiry.aggregate([
        {$unwind: '$stack'},
        { $group: {
            _id: '$stack',
            enquiryCount: {$sum: 1},
            enquiry:{$push: '$name'}
        }},
        {$addFields: {stack: "$_id"}}, //adds a firld stack
        {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
        {$sort: {enquiryCount: -1}}, // sort in decending order by setting -1
        { $match: {stack: mystack}},
    ]) 

    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        action : "aggregatation",
        lenght : enquiry.length,
        data: enquiry
    }) 
})


exports.getEnquiryByTechnology = asyncErrorHandler(async (req, res, next) => {
    //allows us access to the aggregation pipeline
    const mytechnology = req.params.technology
    const enquiry = await Enquiry.aggregate([
        {$unwind: '$technology'},
        { $group: {
            _id: '$technology',
            enquiryCount: {$sum: 1},
            enquirys:{$push: '$name'}
        }},
        {$addFields: {technology: "$_id"}}, //adds a field technology
        {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
        {$sort: {enquiryCount: -1}}, // sort in decending order by setting -1
        {$match: {technology: mytechnology}},


    ]) 

    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        action : "aggregatation",
        lenght : enquiry.length,
        data: enquiry
    }) 
})