const Course = require('../Models/courseModel');
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const CustomErrorHandler = require('../Utils/CustomError')


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


exports.getCourses = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Course.find(), req.query).filter().sort().limitfields().paginate()
 
    let courses = await features.query

    res.status(200).json({ 
        status : "success",
        resource : "movie",
        lenght : courses.length,
        data : courses
       })  
})

exports.postCourse = asyncErrorHandler(async (req, res, next) => {
        const course = await Course.create(req.body)
        res.status(201).json({ 
            status : "success",
            resource : "course",
            course : "created",
            lenght : course.length,
            data : course
           })  
})


exports.getACourse = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
        const course = await Course.findById(req.params._id)
        if(!course){
            const error = new CustomError(`Course with ID: ${req.params._id} is not found`, 404)
            //return to prevent further execution of the rest of the codes
            return next(error)
        }
        res.status(200).json({ 
            status : "success",
            resource : "course",
            course : "created",
            lenght : course.length,
            data : course
        })  
})

exports.patchACourse = asyncErrorHandler(async (req, res, next) => {
        // const movie = await movie.find({_id: req.param._id})
            const course = await Course.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
            if(!course){
                const error = new CustomError(`Course with ID: ${req.params._id} is not found`, 404)
                return next(error)
            }
            res.status(200).json({ 
                status : "success",
                resource : "course",
                action: "patch",
                lenght : course.length,
                data : course
            })  
})

exports.putACourse = asyncErrorHandler(async (req, res, next) => {
        // const movie = await movie.find({_id: req.param._id})
        const course = await Course.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
        if(!course){
            const error = new CustomError(`Course with ID: ${req.params._id} is not available`, 404)
            return next(error)
        }
        res.status(200).json({ 
            status : "success",
            resource : "course",
            action : "put",
            lenght : course.length,
            data : course
        })  
})

exports.deleteCourse = asyncErrorHandler(async (req, res, next) => {
        // const movie = await movie.find({_id: req.param._id})
            const course = await Course.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
            if(!course){
                const error = new CustomError(`Course with ID: ${req.params._id} is not available`, 404)
                return next(error)
            }
            res.status(204).json({ 
                status : "success",
                resource : "course",
                message: 'deleted'
            })  
})

//Aggregation pipelines
exports.getcourseStats = asyncErrorHandler(async (req, res, next) => {
        //allows us access to the aggregation pipeline
        const stats = await Course.aggregate([
            //match ratings
            { $match: {ratings: {$gte: 4}}},
            { $group: {
                avgRating: {$avg: '$ratings'},
                avgAlumni: {$avg: '$alumni'},
                minAlumni: {$min: '$alumni'},
                maxAlumni: {$max: '$alumni'},
                avgStudents: {$avg: '$students'},
                minStudents: {$min: '$students'},
                maxStudents: {$max: '$students'},
            }},
            
            { $sort: {maxStudents: 1}}
        ]) 

        res.status(200).json({ 
            status : "success",
            resource : "movies",
            action : "aggregatation",
            lenght : stats.length,
            data: stats
        }) 
})

exports.getcoursesByStack = asyncErrorHandler(async (req, res, next) => {
        //allows us access to the aggregation pipeline
        const mystack = req.params.stack
        const courses = await Movie.aggregate([
            {$unwind: '$stack'},
            { $group: {
                _id: '$stack',
                courseCount: {$sum: 1},
                courses:{$push: '$name'}
            }},
            {$addFields: {stack: "$_id"}}, //adds a firld stack
            {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
            {$sort: {movieCount: -1}}, // sort in decending order by setting -1
            // {$limit: 6} // liniting response to 6
            { $match: {stack: mystack}},


        ]) 

        res.status(200).json({ 
            status : "success",
            resource : "movies",
            action : "aggregatation",
            lenght : courses.length,
            data: courses
        }) 
})


exports.getcoursesByTechnology = asyncErrorHandler(async (req, res, next) => {
    //allows us access to the aggregation pipeline
    const mytechnology = req.params.technology
    const courses = await Movie.aggregate([
        {$unwind: '$technology'},
        { $group: {
            _id: '$technology',
            courseCount: {$sum: 1},
            courses:{$push: '$name'}
        }},
        {$addFields: {technology: "$_id"}}, //adds a firld technology
        {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
        {$sort: {courseCount: -1}}, // sort in decending order by setting -1
        { $match: {technology: mytechnology}},


    ]) 

    res.status(200).json({ 
        status : "success",
        resource : "movies",
        action : "aggregatation",
        lenght : courses.length,
        data: courses
    }) 
})