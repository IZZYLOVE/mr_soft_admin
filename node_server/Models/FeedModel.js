const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')
const AutoLogFile = require('../Utils/AutoLogFile')


const feedSchema = new mongoose.Schema(
        {
    "userId": {type: String, unique: true, required: [true, 'please enter userId'], trim: true},

    "thetext": {type: String, required: [true, 'Please enter thetesxt message'], trim: true},

    "files": [Object],

    "likes": {type: Number, default: 0, trim: true},
    "dislikes": {type: Number, default: 0, trim: true},
    "releaseDate": {type: Date, default: Date.now, required: true, trim: true},
    "created": {type: Date, default: Date.now, immutable: true, trim: true},
    "updated": {type: Date, default: Date.now, trim: true,  select: false},
})




// USING MONGOOSE MIDDLEWARE
//post hook
feedSchema.post('save', async function(doc, next){
    const content = `A new course document with name ${doc.name} created by ${doc.createdBy} on ${doc.created}\n`
        const logFile = await AutoLogFile()
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


feedSchema.pre(/^find/, async function(next){
    this.find({releaseDate: {$lte: Date.now()}})
    this.startTime = Date.now()
    next()
})


feedSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    // this.find({releaseDate: {$lte: Date.now()}})
    this.endTime = Date.now()
    const logFile = await AutoLogFile()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


// AGGREGATION MIDDLEWARES
feedSchema.pre('aggregate', function(next){
    // this here points to the corrently processing aggregation object
    this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}})
     next()
})

module.exports = mongoose.model('feed', feedSchema)