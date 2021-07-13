var mongoose = require('mongoose')
var KRASchema = require('../modules/KRA')
var KRA_INDSchema = new mongoose.Schema({
    EmployeeName:{type:String,required:false},
    Position:{type:String,required:false},
    EmployeeStartDate:{type:Date,required:false},
    EmployeeID:{type:Number,required:false,unique:true},
    DepartmentID:{type:Number,required:false},
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
})
var model = mongoose.model("KRA_IND",KRA_INDSchema)
module.exports = model