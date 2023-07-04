const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')
const AutoLogFile = require('../Utils/AutoLogFile')



const courseSchema = new mongoose.Schema(
        {
    "courseCode": {type: String, unique: true, required: [true, 'please enter course code'], trim: true},

    "courseName": {type: String, unique: true, required: [true, 'Please enter course name'], trim: true},

    "description": {type: String, required: [true, 'Please enter course description'], trim: true},

    "CourseMode":{type: String, required: [true, 'Please enter course mode'], enum: ['Online', 'On-Site', 'Full-time', 'Part-time'], default: 'On-Site', trim: true},
    
    "Image": String,

    "venue": {type: String, required: [true, 'Please enter venue for course'], trim: true},
  
    "stack": {type: String, default: ['MERN'],
        enum: {
        values: ["MERN", "MEAN", "LAMP", "LEMP", "MERM"],
        message: "This stack does not exist"
        },
        trim: true},
        // make a list of options with the values above

    "technologies": {type: Array, default: ['JavaScript'], trim: true},
        // make a list of multiple selection options with the values below and generate an array with the selected options
        // values: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Express", "Node.js", "MongoDB", "Angular", "Vue", "PostgreSQL", "Linux", "Apache", "Mysql", "Php", "Pearl", "Python"],

    "Availability": {
        type: Boolean,
        required: true
    },





    // not required in the user inpute form
    "alumni": {type: Number, default: 0, trim: true},
    "students": {type: Number, default: 0, trim: true},
    "deffered": {type: Number, default: 0, trim: true},
    "createdBy": {type: String, required: [true, 'Please complete the hidden field createdBy'], trim: true},
    "ratings": {type: Number, default: 0, trim: true},
    "releaseDate": {type: Date, default: Date.now, required: true, trim: true},
    "created": {type: Date, default: Date.now, immutable: true, trim: true},
    "updated": {type: Date, default: Date.now, trim: true,  select: false},
})




// USING MONGOOSE MIDDLEWARE
//post hook
courseSchema.post('save', async function(doc, next){
    const content = `A new course document with courseCode ${doc.courseCode} created by ${doc.createdBy} on ${doc.created}\n`
    const logFile = await AutoLogFile()
    console.log(logFile)
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


courseSchema.pre(/^find/, async function(next){
    this.find({releaseDate: {$lte: Date.now()}})
    this.startTime = Date.now()
    next()
})


courseSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.find({releaseDate: {$lte: Date.now()}})
    this.endTime = Date.now()
    const logFile = await AutoLogFile()
    console.log(logFile)
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


// AGGREGATION MIDDLEWARES
courseSchema.pre('aggregate', function(next){
    // this here points to the corrently processing aggregation object
    this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}})
     next()
})

module.exports = mongoose.model('course', courseSchema)