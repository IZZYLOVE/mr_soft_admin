const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const crypto = require('crypto')


const userSchema = new mongoose.Schema(
   
    {
        "firstName": {type: String, required: [true, 'please enter your first name'], trim: true},
        "middleName": {type: String, required: [true, 'please enter your middle name'], trim: true},
        "lastName": {type: String, required: [true, 'please enter your last name'], trim: true},
        "photo": String,
        "email": {type: String, unique: true, required: [true, 'please enter email'], lowercase: true, trim: true    
        , validate: [validator.isEmail, 'please enter a valid email']
        },
        "password": {type: String, required: [true, 'please enter password'],  minlenght: [8, 'password must be at least 8 character'], select: false, minlenght: 8},
        // "confirmPassword": {type: String, required: [true, 'please confirm your password'],  minlenght: [8, 'confirm password must be at least 8 character'], select: false, minlenght: 8},
        "confirmPassword": {type: String, required: [true, 'please enter value for confirmPassword'],
            validate: {
                validator:function(val){ return val == this.password },
                message : `Password and confirmPassword does not match! ${this.val} = ${this.password}`
            }
        },
        "role": {type: String, enum: ['user', 'admin', 'owner'], default: 'user'
        },
        "passwordChangedAt": {type: Date, default: Date.now, trim: true},
        // "passwordResetToken": {type: String, trim: true}, 
        "passwordResetToken": String, 
        // "passwordResetTokenExp": {type: Date, trim: true, select: false}, 
        "passwordResetTokenExp":  Date, 
        "phone": {type: String, required: [true, 'please enter phone'], trim: true},
        "created": {type: Date, default: Date.now, immutable: true, trim: true,  select: false},
        "updated": {type: Date, default: Date.now, trim: true,  select: false},
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined // removes confirmPassword from the database
    next();
})


//creating a user instance method that compares password
userSchema.methods.comparePasswordInDb = async function(password, passwordDb){
    return await bcrypt.compare(password, passwordDb) 
}

//check if the user has changed password since the token was issued
userSchema.methods.isPasswordChanged = async function(jwtTimeStamp){
    if(this.passwordChangedAt){
        const passwordChangedTimeStamp =parseInt(this.passwordChangedAt.getTime()/1000, 10)// in base 10
        return  jwtTimeStamp < passwordChangedTimeStamp // passwoard has been changed
    }
    return false
}

userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex') // prepares the user document with the encrypted password rest token
    this.passwordResetTokenExp = Date.now() + (10 * 60 * 1000) // prepares the user document with the encrypted password rest token expiration time
    // we will save this info in the authController
    console.log(resetToken, this.passwordResetToken, this.passwordResetTokenExp)
    return resetToken // returns the plain resetToken to the authController to be ssent to the user
}

const User =  mongoose.model('User', userSchema)
module.exports = User