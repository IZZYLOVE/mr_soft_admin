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



// //  Add CORS headers
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000', 'http://127.0.0.1:3000'  );
//     next();
//   });

//DETERMINING CONNECTION STRING/URL
console.log("process.env.TestingForProduction === "+process.env.TestingForProduction)
console.log("process.env.NODE_ENV === "+process.env.NODE_ENV)

let URL, HOST;
if(process.env.NODE_ENV === "development"){
    console.log("NODE_ENV === development")

    URL = process.env.LOCAL_CONN
    HOST = process.env.DEV_HOST
}
else if(process.env.TestingForProduction = true && process.env.NODE_ENV === "production"){
    console.log("NODE_ENV === production (testing)")
    URL = process.env.LOCAL_CONN
    HOST = process.env.DEV_HOST
}
else{
    console.log("NODE_ENV === production")
    URL = process.env.HOSTED_CONN 
    HOST = process.env.PROD_HOST 
}

//db connection
mongoose.connect(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: true
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
const serverName = "MrSoftTraining"
const server = app.listen(port, () => {
    const host= server.address().address 
    console.log(`${serverName} server already running on port ${port}`)
    console.log(`server URL: http://${host}:${port}`)
    console.log(`client URL: http://${HOST}`)

    console.log(`...waiting for database connection...`)
})
