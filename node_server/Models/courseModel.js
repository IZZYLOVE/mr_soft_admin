const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')

const courseSchema = new mongoose.Schema(
        {
    "courseId": {type: String, unique: true, required: [true, 'please enter course id'], trim: true},

    "courseName": {type: String, unique: true, required: [true, 'please enter course name'], trim: true},

    "description": {type: String, required: [true, 'please enter course description'], trim: true},

    "CourseMode":{type: String, required: [true, 'please enter course mode'], enum: ['Online', 'On-Site', 'Full-time', 'Part-time'], default: 'user', trim: true},
    "Image": String,

    "venue": {type: String, required: [true, 'please enter venue for course'], trim: true},
  
    "stack": {type: String, default: ['drama'],
        enum: {
        values: ["JavaScript", "Php", "Python"],
        message: "this stack does not exist"
        },
        trim: true},

    "technologies": {type: String, default: ['HTML'],
        enum: {
            values: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Express", "Node.js", "MongoDB", "Angular", "Vue", "PostgreSQL", "Linux", "Apache", "Mysql", "Php", "Pearl", "Python"],
            message: "this technology does not exist"
        },
        trim: true},

    "Availability": {
        type: Boolean,
        required: true
    },

    "alumni": {type: Number, default: 0, trim: true},

    "students": {type: Number, default: 0, trim: true},

    "ratings": {type: Number, required: true, 
        validate: {
            validator: function(value){ return value >= 1 && value <= 10 },
            message: "Ratings must be range 1 to 10, your specified value is {VALUE}"
        }, default: 1.0, trim: true},

    "releaseDate": {type: Date, default: Date.now, required: true, trim: true},
    "created": {type: Date, default: Date.now, immutable: true, trim: true},
    "updated": {type: Date, default: Date.now, trim: true,  select: false},
})




// USING MONGOOSE MIDDLEWARE
//pre hook
courseSchema.pre('save', async function(req, next){
    // this here points to the corrent document
    // this.createdBy = "King"
    this.createdBy = req.user.name
    next();
})

//post hook
courseSchema.post('save', async function(doc, next){
    const content = `A new course document with name ${doc.name} created by ${doc.createdBy} on ${doc.created}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
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
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
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
