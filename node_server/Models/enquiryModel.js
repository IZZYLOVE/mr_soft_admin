const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')

const enquirySchema = new mongoose.Schema(
{
    "email": {type: String,  required: [true, 'Please enter a valid email'], trim: true},// email

    "query": {type: String, required: [true, 'Please enter search query'], trim: true},

    "stack": {type: String, default: ['MERN'],
        enum: {
        values: ["MERN", "MEAN", "LAMP"],
        message: "This stack does not exist"
        },
        trim: true},
        // make a list of options with the values above

    "technologies": {type: Array, default: ['JavaScript'], trim: true},
        // make a list of multiple selection options with the values below and generate an array with the selected options
        // values: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Express", "Node.js", "MongoDB", "Angular", "Vue", "PostgreSQL", "Linux", "Apache", "Mysql", "Php", "Pearl", "Python"],


    "created": {type: Date, default: Date.now, immutable: true, trim: true},
})




// USING MONGOOSE MIDDLEWARE
//post hook
enquirySchema.post('save', async function(doc, next){
    const content = `A new enquiry document created by ${doc.userId} on ${doc.created}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


enquirySchema.pre(/^find/, async function(next){
    this.startTime = Date.now()
    next()
})


enquirySchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.endTime = Date.now()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})

module.exports = mongoose.model('enquiry', enquirySchema)
