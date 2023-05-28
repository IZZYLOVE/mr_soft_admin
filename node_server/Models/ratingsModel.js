const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')

const ratingSchema = new mongoose.Schema(
        {
    "userId": {type: String,  required: [true, 'please enter a valid user id'], trim: true},

    "courseId": {type: String,  required: [true, 'please enter a valid course id'], trim: true},

    "ratings": {type: Number, required: true, 
        validate: {
            validator: function(value){ return value >= 1 && value <= 5 },
            message: "Ratings must be range 1 to 5, your specified value is {VALUE}"
        }, default: 1.0, trim: true},

    "comment": {type: String, required: [true, 'please enter course description'], trim: true},

    "created": {type: Date, default: Date.now, immutable: true, trim: true},

    "updated": {type: Date, default: Date.now, trim: true,  select: false},
})




// USING MONGOOSE MIDDLEWARE
//post hook
ratingSchema.post('save', async function(doc, next){
    const content = `A new rating and comment document created by ${doc.userId} on ${doc.created}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


ratingSchema.pre(/^find/, async function(next){
    this.startTime = Date.now()
    next()
})


ratingSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.endTime = Date.now()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


// AGGREGATION MIDDLEWARES
ratingSchema.pre('aggregate', function(next){
    // this here points to the corrently processing aggregation object
    this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}})
     next()
})

module.exports = mongoose.model('rating', ratingSchema)
