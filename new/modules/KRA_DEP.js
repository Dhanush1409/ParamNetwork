const mongoose = require('mongoose')
var KRASchema = require("../modules/KRA")
var KRA_DEPSchema =  new mongoose.Schema({
    DepartmentID:{type:Number,required:false,unique:true},
    Department:{type:String,required:false},
    DepartmentSuperVisior:{type:String,required:false},
    TodaysDate:{type:String,required:false},
    ReviewerName:{type:String,required:false},
    ReviewerTitle:{type:String,required:false},
    LastRevisied:{type:String,required:false},
    DepartmentMission:{
        Description:{type:String,required:false},
        Goal:{type:String,required:false},
        Objectivies:{type:String,required:false},
    },
    GrowthPlan:{
        Description:{type:String,required:false},
    },
    KRA:[KRASchema]
},)
const model = mongoose.model('KRA_DEP',KRA_DEPSchema);
module.exports = model