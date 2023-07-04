//INPORT EXPRESS
const express = require('express')
const path = require('path')
const bodyParserx = require('body-parser')
let app = express()
app.use(express.json())

// To support cors and allow us send and recieve data through url we use cors
const cors = require('cors');
app.use(cors()) // allows cross origin scripting
app.use(bodyParserx.json()) 
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) // lets us access static files in the upload folder

const courseRouter = require('./Routes/courseroutes')
const authRouter = require('./Routes/authrouter')
const ratingRouter = require('./Routes/ratingroutes')
const enquiryRouter = require('./Routes/enquiryroutes')
const statsRouter = require('./Routes/statsroutes')
const filesRouter = require('./Routes/fileuploadroutes')
const supportRouter = require('./Routes/supportroutes')
const supportTicketRouter = require('./Routes/supportsticketroutes')
const feedsRouter = require('./Routes/feedsroutes')
const contactMessageRouter = require('./Routes/contactMessagetroutes')

const CustomError = require('./Utils/CustomError')
const globalErrorHandler = require('./Controllers/errorController');



const logger = function(req, res, next){
    console.log("custom middle ware called")
    console.log("req.body")
    console.log(req.body)
    console.log("req.files")
    console.log(req.files) 
    console.log("req")
    console.log(req) 

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
app.use('/api/v1/files', filesRouter)// mounting stats route
app.use('/api/v1/supports', supportRouter)// mounting support route
app.use('/api/v1/supporttickets', supportTicketRouter)// mounting supportTicket route
app.use('/api/v1/feeds', feedsRouter)// mounting supportTicket route
app.use('/api/v1/contactmessages', contactMessageRouter)// mounting contact message route






//DEFAULT ROUTE
app.all('*', (req, res, next) =>{
    const err = new CustomError(`Cant't find ${req.originalUrl}`, 404)
    next(err)// call the global error handling middleware 
})


app.use(globalErrorHandler)


module.exports = app