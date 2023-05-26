const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema(
   
    {
        "values": [Number],
        "Month": {type: String, require: true},
    }
)

module.exports = mongoose.model('sales', saleSchema)