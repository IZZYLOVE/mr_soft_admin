const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
   
    {
        "firstName": {type: String, required: true},
        "middleName": {type: String, required: true},
        "lastName": {type: String, required: true},
        "email": {type: String, required: true, lowercase: true},
        "password": {type: String, required: true},
        "phone": {type: String, required: true},
        "superx": {type: Number, required: true, default: 0},
        "level": {type: Number, required: true,  default: 0},
        // "created": {type: Date, immutable: true, default: () => Date.now},
        "created": {type: Date, default: Date.now, immutable: true,},
        "updated": {type: Date, default: Date.now}
    }
)

module.exports = mongoose.model('user', userSchema)