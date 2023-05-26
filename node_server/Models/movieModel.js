const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')

const movieSchema = new mongoose.Schema(
    {
        "name": {type: String, unique: true, required: [true, 'please enter movie name'], trim: true},
        "releaseYear": {type: Number, required: true, default: 1990, trim: true},
        "releaseDate": {type: Date, required: true, trim: true},
        "duration": {type: Number, required: [true, 'please enter duratin in minutes'], min:[3, "Duration must be 5 or above, your specified value is {VALUE}"],  default: 90, trim: true},
        "price": {type: Number, required: [true, 'please enter ptice'],  default: 5, trim: true},
        "createdBy": {type: String, trim: true},
        "genre": {type: Array, default: ['drama'],
  
        // "genre": {type: String, default: ['drama'],
        // enum: {
        //     //can only be used on type string
        //    values: ["action", "romance", "drama", "commedy", "singing"],
        //    message: "this genre does not exist"
        // },
        trim: true},
        // "genre": {type: String, required: [true, 'please enter movie grnre'], trim: true},
        "ratings": {type: Number, required: true, 
            // min: [1, 'Ratings must be at least 1'], 
            // max: [1, 'Ratings must be 10 or les'],  
            // for custom validation we have commented out the bultin min and max validations so we build the with custom validation
            validate: {
                //custom validator should return true or false
                // this validator will work both for create and update because we are not using the this keyword, else it will work only for creating
                validator: function(value){ return value >= 1 && value <= 10 },
                message: "Ratings must be range 1 to 10, your specified value is {VALUE}"
            },

            default: 1.0, trim: true},
        "created": {type: Date, default: Date.now, immutable: true, trim: true},
        "updated": {type: Date, default: Date.now, trim: true,  select: false},
    },
    {
        toJSON: {virtuals: true}, // telling the schema to output the virtual property when we are outputing the data in json format
        toOject: {virtuals: true} // telling the schema to output the virtual property when we are outputing the data in json format in an object
    }
)


// adding a virtual property
// to display the virtual propert, we need to add the field explixitly to the schema
// Note: we cannot use virtual property to query data
movieSchema.virtual('durationInHours').get(
    function(){
        return this.duration / 60;
    }
)

// USING MONGOOSE MIDDLEWARE

// DOCUMENT MIDDLEWARE
// NOTE: we can use as many pre or post hooks as we want and write our logic in each of them as needed and they will be executed in their order
// this middle wae runs when we call .save or .create methods
//pre hook
//doing something bedore saving
movieSchema.pre('save', async function(next){
    // this here points to the corrent document
    this.createdBy = "King"
    next();
})

//post hook
//doing something after saving
//doc == the just save document
movieSchema.post('save', async function(doc, next){
    const content = `A new movie document with name ${doc.name} created by ${doc.createdBy} on ${doc.created}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})



// i want to try to log who deleted and what was deleted
// movieSchema.post('delete', async function(doc, next){
//     const content = `A new movie document with name ${doc.name} deleted by \n`
//     fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
//         console.log(err.message)
//     })
//     next()
// })



//QUERRY MIDDLEWARE
// these middleware is triggered by the find() 
// pre and post

// movieSchema.pre('find', async function(next){// this is fired by the find query
//     // this here points to the corrent querry
//     this.find({releaseDate: {$lte: Date.now()}})// returns those movie object where the release date is less than or equal to now
//     next()
// })

movieSchema.pre(/^find/, async function(next){// ths is fired by any query that starts with find hence covers all find query
    // this here points to the corrent querry
    this.find({releaseDate: {$lte: Date.now()}})// returns those movie object where the release date is less than or equal to now
    this.startTime = Date.now()
    next()
})


movieSchema.post(/^find/, async function(docs,next){// ths is fired by any query that starts with find hence covers all find query
    // this here points to the corrent querry
    this.find({releaseDate: {$lte: Date.now()}})// returns those movie object where the release date is less than or equal to now
    this.endTime = Date.now()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'},(err) => {
        console.log(err.message)
    })
    next()
})


// AGGREGATION MIDDLEWARES
movieSchema.pre('aggregate', function(next){// ths is fired by any query that starts with find hence covers all find query
    // this here points to the corrently processing aggregation object
    this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}})
     next()
})


// DATA VALIDATION 
// procademy = #89
//there are built in validators which we have already used some on the schema
//Custom Validators
// third party validators


const Movie = mongoose.model('movie', movieSchema)

module.exports = Movie