const Stats = require('../Models/statsModal')
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')



exports.latestStats = asyncErrorHandler(async (req, res, next) => {
    //pre filling the sorting and limit
    req.query.limit = '6'
    req.query.sort = '-created'
    next()
})

exports.getStats = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Stats.find(), req.query).filter().sort().limitfields().limitfields2().paginate()
 
    let stats = await features.query

    req.query.page && paginationCrossCheck(stats.length)

    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        lenght : stats.length,
        data : stats
       })  
})


exports.deleteStats = asyncErrorHandler(async (req, res, next) => {
    const stats = await Stats.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
    if(!stats){
        const error = new CustomError(`Stats with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }
    res.status(204).json({ 
        status : "success",
        resource : "stats",
        message: 'deleted'
    })  
})