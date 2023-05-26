const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
   
    {
        "firstName": {type: String, require: true},
        "middleName": {type: String, require: true},
        "lastName": {type: String, require: true},
        "email": {type: String, require: true},
        "password": {type: String, require: true},
        "phone": {type: Number, require: true},
        "superx": {type: Number, require: true},
        "level": {type: Number, require: true},
        "created": {type: Date, default: Date.now},
        "updated": {type: Date, default: Date.now}
    }
)

module.exports = mongoose.model('order', orderSchema)