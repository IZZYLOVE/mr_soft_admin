const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')
const AutoLogFile = require('../Utils/AutoLogFile')


const contactMessageSchema = new mongoose.Schema(
{
    "email": {type: String, required: [true, 'please enter userId'], trim: true},

    "phone": {type: String, required: [true, 'Please enter phone number'], trim: true},

    "message": {type: String, required: [true, 'Please enter the message'], trim: true},

    "status": {type: String, default: 'open', required: true, trim: true},

    // not required in the user inpute form
    "releaseDate": {type: Date, default: Date.now, required: true, trim: true},
    "created": {type: Date, default: Date.now, immutable: true, trim: true},
    "updated": {type: Date, default: Date.now, trim: true,  select: false},
})




// USING MONGOOSE MIDDLEWARE
//post hook
contactMessageSchema.post('save', async function(doc, next){
    const content = `A new course document with name ${doc.name} created by ${doc.createdBy} on ${doc.created}\n`
        const logFile = await AutoLogFile()
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


contactMessageSchema.pre(/^find/, async function(next){
    this.find({releaseDate: {$lte: Date.now()}})
    this.startTime = Date.now()
    next()
})


contactMessageSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.find({releaseDate: {$lte: Date.now()}})
    this.endTime = Date.now()
    const logFile = await AutoLogFile()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


// AGGREGATION MIDDLEWARES
contactMessageSchema.pre('aggregate', function(next){
    // this here points to the corrently processing aggregation object
    this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}})
     next()
})

module.exports = mongoose.model('contactmessage', contactMessageSchema)