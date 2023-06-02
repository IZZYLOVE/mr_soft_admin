//INPORT EXPRESS
const express = require('express')
let app = express()

// To support cors and allow us send and recieve data through url we use cors
const cors = require('cors');
app.use(cors())

const courseRouter = require('./Routes/courseroutes')
const authRouter = require('./Routes/authrouter')
const ratingRouter = require('./Routes/ratingroutes')
const enquiryRouter = require('./Routes/enquirtroutes')
const statsRouter = require('./Routes/statsroutes')

const CustomError = require('./Utils/CustomError')
const globalErrorHandler = require('./Controllers/errorController')



const logger = function(req, res, next){
    console.log("custom middle ware called")
    next()
}

const requestedAt = function(req, res, next){
    req.requestedAt = new Date().toISOString()
    next()
}


// USING MIDDLESWARES

//NOTE: a middleware will be applied to all endpoints/route handlers below/after it 
//to allow us add request body to post request
app.use(express.json()) //middleware
if(process.env.NODE_ENV === "development"){
    const morgan = require('morgan')
    // app.use(morgan('dev')) //middleware
}
app.use(express.static('./public'))// for web static files
app.use(logger) //middleware
app.use(requestedAt) //middleware



// USING ROUTES

app.use('/api/v1/users', authRouter)// mounting user/auth route 
app.use('/api/v1/courses', courseRouter)// mounting course route
app.use('/api/v1/ratings', ratingRouter)// mounting rating route
app.use('/api/v1/enquiries', enquiryRouter)// mounting enquiry route
app.use('/api/v1/stats', statsRouter)// mounting stats route






//DEFAULT ROUTE
app.all('*', (req, res, next) =>{
    // return res.status(404).json({
    //     status : "fail",
    //     message : `Cant't find ${req.originalUrl}`
    // })

    // const err = new Error(`Cant't find ${req.originalUrl}`)
    // err.status = 'fail'
    // err.statusCode = 404

    const err = new CustomError(`Cant't find ${req.originalUrl}`, 404)
    next(err)// call the global error handling middleware 
})


app.use(globalErrorHandler)


module.exports = app