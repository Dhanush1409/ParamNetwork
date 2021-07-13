var mongoose = require('mongoose')
var schema = new mongoose.Schema([{
    _id:{type:String},
    sequence:{type:Number}
}])
var model = mongoose.model("counter",schema)
module.exports = model