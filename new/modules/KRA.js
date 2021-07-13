const mongoose = require('mongoose')
 var KRASchema = new mongoose.Schema({
     KRA_ID:{type:Number,unquie:true},
     KPI:{
        KPI_ID:{type:Number,unique:true},
        KPI_Data:{
            Description:{type:String},
            Result:{type:Array},
            Goal:{type:String}
        },
    },
 },{_id:false})
 const model = mongoose.model('KRA',KRASchema)
 module.export = model