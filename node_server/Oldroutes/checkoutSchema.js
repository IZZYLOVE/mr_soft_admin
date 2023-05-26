const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema(
   
    {
      "userId": {type: Number, require: true},
      "firstName": {type: String, require: true},
      "middleName": {type: String, require: true},
      "lastName": {type: String, require: true},
      "email": {type: String, require: true},
      "phone": {type: String, require: true},
      "address": {type: String, require: true},
      "seconds": {type: Number, require: true},
      "checkoutId": {type: String, require: true},
      "Orders": [],
      "created": {type: Date, default: Date.now},
    }
)

module.exports = mongoose.model('checkouts', checkoutSchema)