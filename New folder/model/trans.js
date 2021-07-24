const mongoose = require('mongoose')
const Trans_Schema = new mongoose.Schema({
    price:{type:Number},
    status:{type:String}

},{id:false})
module.exports = mongoose.model('Transcation',Trans_Schema)