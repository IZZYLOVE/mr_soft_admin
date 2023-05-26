const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
   
    {
        "dealer": {type: String, require: true},
        "dealerId": {type: mongoose.SchemaTypes.ObjectId},
        "dealerPhone": {type: String, require: true},
        "productName": {type: String, require: true},
        "price": {type: Number, require: true},
        "currency": {type: String, require: true},
        "about": {type: String, require: true},
        "productImage": {type: String, require: true},
        "quantity": {type: Number, require: true},
        "isLowQuantity": {type: Number, require: true},
        "created": {type: Date, default: Date.now, immutable: true,},
        "updated": {type: Date, default: Date.now}
    }
)

module.exports = mongoose.model('product', productSchema)