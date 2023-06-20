const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')
const AutoLogFile = require('../Utils/AutoLogFile')


const supportSchema = new mongoose.Schema(
        {
    "supportCode": {type: String, unique: true, required: [true, 'please enter supportCode'], trim: true},

    "userId": {type: String, required: [true, 'Please enter userId'], trim: true},

    "message": {type: String, required: [true, 'Please enter course description'], trim: true},

    "files": [Object],

    // "createdBy": {type: String, required: [true, 'Please complete the hidden field createdBy'], trim: true},
    
    // "releaseDate": {type: Date, default: Date.now, required: true, trim: true},
    "created": {type: Date, default: Date.now, immutable: true, trim: true},
    "updated": {type: Date, default: Date.now, trim: true,  select: false}, 
})




// USING MONGOOSE MIDDLEWARE
//post hook
supportSchema.post('save', async function(doc, next){
    const logFile = await AutoLogFile()
    const content = `A new support document with issueCode ${doc.issueCode} created by ${doc.createdBy} on ${doc.created}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


supportSchema.pre(/^find/, async function(next){
    this.find({releaseDate: {$lte: Date.now()}})
    this.startTime = Date.now()
    next()
})


supportSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.endTime = Date.now()
    const logFile = await AutoLogFile()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


// AGGREGATION MIDDLEWARES
supportSchema.pre('aggregate', function(next){
    // this here points to the corrently processing aggregation object
    this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}})
     next()
})

module.exports = mongoose.model('support', supportSchema)