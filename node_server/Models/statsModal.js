const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')
const AutoLogFile = require('../Utils/AutoLogFile')



const statsSchema = new mongoose.Schema(
{
    "month": {type: String,  unique: true, required: [true, 'Please enter a valid email'], trim: true},// email
    "enquiryCount": {type: Number, default: 0, trim: true},
    "regCount": {type: Number, default: 0, trim: true},

    "alumni": {type: Number, default: 0, trim: true},
    "students": {type: Number, default: 0, trim: true},
    "deffered": {type: Number, default: 0, trim: true},

    // not required in the user inpute form
    "created": {type: Date, default: Date.now, immutable: true, trim: true},
    "updated": {type: Date, default: Date.now, trim: true},

})



// USING MONGOOSE MIDDLEWARE
//post hook
statsSchema.post('save', async function(doc, next){
    const logFile = await AutoLogFile()
    const content = `A new stats document created by ${doc.userId} on ${doc.created}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


statsSchema.pre(/^find/, async function(next){
    this.startTime = Date.now()
    next()
})


statsSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.endTime = Date.now()
    const logFile = await AutoLogFile()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})

module.exports = mongoose.model('stats', statsSchema)
