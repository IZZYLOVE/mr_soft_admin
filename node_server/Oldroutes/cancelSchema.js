const mongoose = require('mongoose')

const cancelSchema = new mongoose.Schema(
   
    {
        "values": [Number],
        "Month": {type: String, require: true},
    }
)

module.exports = mongoose.model('cancel', cancelSchema,)