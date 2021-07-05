const mongoose = require('mongoose')
var KPISchema = new mongoose.Schema({
    KPI_ID:{type:String},
    KPI_Data:{
        Description:{type:String},
        Result:{type:Array},
        Goal:{type:String}
    },
},{_id:false})
var KRA_DEPSchema =  new mongoose.Schema({
    DepartmentID:{type:String,required:false,unique:true},
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
    KRA:[{
        KRA_ID:{type:String,required:false,},
        KPI:[KPISchema]
    },{_id:false}]
})
const model = mongoose.model('KRA_DEP',KRA_DEPSchema);
module.exports = model