const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')

const multipleFilesSchema = new mongoose.Schema(
        {

    "title": {type: String,  required: [true, 'please enter a valid file name'], trim: true},

    "files": [Object],

    "created": {type: Date, default: Date.now, immutable: true, trim: true},

    "updated": {type: Date, default: Date.now, trim: true,  select: false},
})




// USING MONGOOSE MIDDLEWARE
//post hook
multipleFilesSchema.post('save', async function(doc, next){
    const content = `A new rating and comment document created by ${doc.userId} on ${doc.created}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    }) 
    next()
})


multipleFilesSchema.pre(/^find/, async function(next){
    this.startTime = Date.now()
    next()
})


multipleFilesSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.endTime = Date.now()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})



module.exports = mongoose.model('multiplefile', multipleFilesSchema)
