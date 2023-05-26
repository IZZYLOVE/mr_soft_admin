// CREATE A SERVER
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

process.on('uncaughtException', (err) => {// this should be at the top, before we require app,  to be able to catch unccaught exceptions
    console.log(err.name, err.message)
    console.log('Uncaught Exception occured shutting down...')
    server.close(() => {
        process.exit(1)
    })
  })

const app = require('./app')
// console.log(app.get('env'))//env set by express
// console.log(process.env)//env set by node js 


//DETERMINING CONNECTION STRING/URL
console.log("process.env.TestingForProduction === "+process.env.TestingForProduction)
console.log("process.env.NODE_ENV === "+process.env.NODE_ENV)

let URL;
if(process.env.NODE_ENV === "development"){
    console.log("NODE_ENV === development")

    URL = process.env.LOCAL_CONN
}
else if(process.env.TestingForProduction = true && process.env.NODE_ENV === "production"){
    console.log("NODE_ENV === production testing")
    URL = process.env.LOCAL_CONN
}
else{
    console.log("NODE_ENV === production")
    URL = process.env.HOSTED_CONN 
}

//db connection
mongoose.connect(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    const connection = mongoose.connection
    connection.once('open', () => {
        console.log('DB Connected')
    })  
    // connection.on('error', () => console.log('DB Connection failed')) // event
  process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message)
    console.log('unhandled rejection occured shutting down...')
    server.close(() => {
        process.exit(1)
    })
  })
//db connection


const port = process.env.PORT0 || 8300
app.listen(port, () => {
    console.log(`server already running on port ${port}`)
    console.log(`...waiting for database connection...`)
})
