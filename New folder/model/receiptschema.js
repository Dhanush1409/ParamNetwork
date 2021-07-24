const mongoose = require ('mongoose')
var TranscationType = require('../model/trans')
const ReceiptSchema = new mongoose.Schema({
    receiptID:{type:Number,unique:true},
    pID:{type:Number},
    status:{type:String},
    buyerID:{type:Number},
    sellerID:{type:Number},
    isMandatory:{type:Boolean},
    index:{type:String},
    note:{type:String},
    tnxMode:{type: mongoose.Schema.Types.ObjectId,
        ref: TranscationType},
    owner:{type:String}

},{id:false})
module.exports = mongoose.model("Receipt",ReceiptSchema)