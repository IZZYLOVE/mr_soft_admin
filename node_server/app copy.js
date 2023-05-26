//INPORT EXPRESS
const express = require('express')
let app = express()

// const morgan = require('morgan')

const logger = function(req, res, next){
    console.log("custom middle ware called")
    next()
}

const requestedAt = function(req, res, next){
    req.requestedAt = new Date().toISOString()
    next()
}

//NOTE: a middleware will be applied to all endpoints/route handlers below/after it 
//to allow us add request body to post request
app.use(express.json()) //middleware
// app.use(morgan('dev')) //middleware
app.use(logger) //middleware
app.use(requestedAt) //middleware


//CREATE ROUTES
//HTTP-METHODs = get, post, put, delete
//URL = 
//ROUTE = HTTP-METHOD + URL
const fs = require('fs')

// reading file once and storing it in a variable
// we want to convert the content of the file to a js object
const movies = JSON.parse(fs.readFileSync('./data/movies.json')) 


//ROUTE HANDLER FUNCTIONS
const getMovies = (req, res) => {
    // the json-json formating
    // res.status(200).json({
    //     message: 'Success',
    //     data: {
    //         movies : movies
    //     }
    // });

    res.status(200).json({
        message: 'Success',
        resource: 'movies',
        requestedAt: req.requestedAt,
        count: movies.length,
        data : movies
    });
}

const postMovie = (req, res) => {
    const newId = (movies[movies.length - 1]._id) + 1
    newmovie = {_id : newId, ...req.body}
    movies.push(newmovie)
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
       res.status(201).json({
        status : "success",
        newmovie : "created",
        requestedAt: req.requestedAt,
        data : newmovie
       })  
    })
}


const getAmovie = (req, res) => {
    const _id = +(req.params._id)
    //find the movie base on _id
        let movie =  movies.find(el => el._id === _id)
        if(!movie){
            return res.status(404).json({
                status : "fail",
                resource : "movie",
                requestedAt: req.requestedAt,
                message : `Movie with ID ${_id} not found`
            })
        }
        res.status(200).json({
            status : "success",
            resource : "movie",
            requestedAt: req.requestedAt,
            data: movie
        })
}

const patchAmovie = (req, res) => {
    const _id = +(req.params._id)
    //find the movie base on _id
        let movieToUpdate =  movies.find(el => el._id === _id)
        if(!movieToUpdate){
            return res.status(404).json({
                status : "fail",
                resource : "movie",
                requestedAt: req.requestedAt,
                message : `Movie with ID ${_id} not found to update`
            })
        }
        let movieIndex = movies.indexOf(movieToUpdate)
        let updatedmovie = {...movieToUpdate, ...req.body}
        movies[movieIndex] = updatedmovie
        fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
            res.status(200).json({
             status : "success",
             message : "patched",
             resource : "movie",
             requestedAt: req.requestedAt,
             data : updatedmovie
            })  
         })
}

const putAmovie = (req, res) => {
    const _id = +(req.params._id)
    //find the movie base on _id
        let movieToUpdate =  movies.find(el => el._id === _id)
        if(!movieToUpdate){
            return res.status(404).json({
                status : "fail",
                resource : "movie",
                requestedAt: req.requestedAt,
                message : `Movie with ID ${_id} not found to update`
            })
        }
        let movieIndex = movies.indexOf(movieToUpdate)
        let updatedmovie = {...movieToUpdate, ...req.body}
        movies[movieIndex] = updatedmovie
        fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
            res.status(200).json({
                status : "success",
                message : "put",
                resource : "movie",
                requestedAt: req.requestedAt,
                data : updatedmovie
            })  
         })
}

const deleteMovie = (req, res) => {
    const _id = +(req.params._id)
    //find the movie base on _id
        let movieToDelete =  movies.find(el => el._id === _id)
        if(!movieToDelete){
            return res.status(404).json({
                status : "fail",
                resource : "movie",
                requestedAt: req.requestedAt,
                message : `Movie with ID ${_id} not found to delete`
            })
        }
        let index = movies.indexOf(movieToDelete )
        movies.splice(index, 1)
        fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
            res.status(204).json({
             status : "success",
             message : "deleteed",
             resource : "movie",
             requestedAt: req.requestedAt,
             data : 'deleted'
            })  
         })
}


//to specify a route parameter we use :parametername eg :_id
// can also specify multiple route parameter
///api/v1/movies/:_id/:name/:email
// note we need to specify values for all parameters else we have an error
// but we can make a route parameter optional by adding question mark eg :email?

// //first refactoring
// ROUTES
// app.get('/api/v1/movies', getMovies)
// app.post('/api/v1/movies', postMovie)
// app.get('/api/v1/movies/:_id', getAmovie)
// app.patch('/api/v1/movies/:_id', patchAmovie)
// app.put('/api/v1/movies/:_id', putAmovie)
// app.delete('/api/v1/movies/:_id', deleteMovie)

const moviesRouter = express.Router()

// we can further refactor
// ROUTES CHAINING
moviesRouter.route('/')
    .get(getMovies)
    .post(postMovie)

moviesRouter.route('/:_id')
    .get(getAmovie)
    .patch(patchAmovie)
    .put(putAmovie)
    .delete(deleteMovie)

app.use('/api/v1/movies', moviesRouter)// mounting route

// CREATE A SERVER
const port = 8300
app.listen(port, () => {
    console.log(`server already running on port ${port} `)
    console.log(`...waiting for database connection...`)
})
