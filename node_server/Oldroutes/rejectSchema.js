const mongoose = require('mongoose')

const rejectSchema = new mongoose.Schema(
   
    {
        "values": [Number],
        "Month": {type: String, require: true},
    }
)

module.exports = mongoose.model('rejects', rejectSchema)