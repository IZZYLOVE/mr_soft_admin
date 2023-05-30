const Rating = require('../Models/ratingsModel');
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const CustomErrorHandler = require('../Utils/CustomError')
const paginationCrossCheck = require('../Utils/paginationCrossCheck')




// PARAM MIDDLEWARES
// exports.checkId = (req, res, next, value) => {
    

//     next()
// }

//ROUTE HANDLER FUNCTIONS
exports.getHighestRated = asyncErrorHandler(async (req, res, next) => {
    //pre filling the sorting and limit
    req.query.limit = '4'
    req.query.sort = 'ratings'
    next()
})


exports.getRatings = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Rating.find(), req.query, Rating).filter().sort().limitfields().limitfields2().paginate()
 
    let ratings = await features.query

    console.log('req.query.page')
    console.log(req.query.page) 

    req.query.page && paginationCrossCheck(ratings.length)

    res.status(200).json({ 
        status : "success",
        resource : "rating",
        lenght : ratings.length,
        data : ratings
       })  
})

exports.postRating = asyncErrorHandler(async (req, res, next) => {
        const rating = await Rating.create(req.body)
        res.status(201).json({ 
            status : "success",
            resource : "rating",
            rating : "created",
            lenght : rating.length,
            data : rating
           })  
})


exports.getRating = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
        const rating = await Rating.findById(req.params._id)
        if(!rating){
            const error = new CustomError(`Rating with ID: ${req.params._id} is not found`, 404)
            //return to prevent further execution of the rest of the codes
            return next(error)
        }
        res.status(200).json({ 
            status : "success",
            resource : "rating",
            lenght : rating.length,
            data : rating
        })  
})

exports.patchRating = asyncErrorHandler(async (req, res, next) => {
            const rating = await Rating.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
            if(!rating){
                const error = new CustomError(`Rating with ID: ${req.params._id} is not found`, 404)
                return next(error)
            }
            res.status(200).json({ 
                status : "success",
                resource : "rating",
                action: "patch",
                lenght : rating.length,
                data : rating
            })  
})

exports.putRating = asyncErrorHandler(async (req, res, next) => {
        const rating = await Rating.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
        if(!rating){
            const error = new CustomError(`Rating with ID: ${req.params._id} is not available`, 404)
            return next(error)
        }
        res.status(200).json({ 
            status : "success",
            resource : "rating",
            action : "put",
            lenght : rating.length,
            data : rating
        })  
})

exports.deleteRating = asyncErrorHandler(async (req, res, next) => {
            const rating = await Rating.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
            if(!rating){
                const error = new CustomError(`Rating with ID: ${req.params._id} is not available`, 404)
                return next(error)
            }
            res.status(204).json({ 
                status : "success",
                resource : "rating",
                message: 'deleted'
            })  
})

