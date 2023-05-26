const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const validators = require('validators')


const userSchema = new mongoose.Schema(
   
    {
        "firstName": {type: String, required: [true, 'please enter your first name'], trim: true},
        "middleName": {type: String, required: [true, 'please enter your middle name'], trim: true},
        "lastName": {type: String, required: [true, 'please enter your last name'], trim: true},
        "email": {type: String, unique: true, required: [true, 'please enter email'], lowercase: true, trim: true    
        // , validate: [validators.isEmail, 'please enter a valid email']
        },
        "password": {type: String, required: [true, 'please enter password'], minlenght: 8},
        "phone": {type: String, required: [true, 'please enter phone'], trim: true},
        "superx": {type: Number, required: true, default: 0, trim: true},
        "level": {type: Number, required: true,  default: 0, trim: true},
        "created": {type: Date, default: Date.now, immutable: true, trim: true},
        "updated": {type: Date, default: Date.now, trim: true},
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return naxt();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('user', userSchema)