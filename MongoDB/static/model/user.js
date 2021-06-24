var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username:{type: String, required:true},
    password:{type: String, required:true}
},
    {
        collection:'users'
    }
)
const model = mongoose.model('userSchema',userSchema);
module.exports = model;