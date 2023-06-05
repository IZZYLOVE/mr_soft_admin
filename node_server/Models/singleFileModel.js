const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')

const singleFileSchema = new mongoose.Schema(
        {

    "fileName": {type: String,  required: [true, 'please enter a valid file name'], trim: true},

    "filePath": {type: String,  required: [true, 'please enter a valid file path'], trim: true},

    "fileType": {type: String, required: [true, 'please enter file type'], trim: true},

    "fileSize": {type: String, required: [true, 'please enter file sizr'], trim: true},

    "created": {type: Date, default: Date.now, immutable: true, trim: true},

    "updated": {type: Date, default: Date.now, trim: true,  select: false},
})




// USING MONGOOSE MIDDLEWARE
//post hook
singleFileSchema.post('save', async function(doc, next){
    const content = `A new rating and comment document created by ${doc.userId} on ${doc.created}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    }) 
    next()
})


singleFileSchema.pre(/^find/, async function(next){
    this.startTime = Date.now()
    next()
})


singleFileSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.endTime = Date.now()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})



module.exports = mongoose.model('singlefile', singleFileSchema)
