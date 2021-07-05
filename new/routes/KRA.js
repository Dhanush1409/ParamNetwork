const express = require ('express')
const router = express.Router()
const KRA_DEP = require("../modules/KRA_DEP")
router.get('/',async(req,res)=>{
    try{
        var  data
        if(req.query.hasOwnProperty("DepartmentID")){
            data = await KRA_DEP.find({DepartmentID:req.query.DepartmentID}).lean()
            console.log("Got the DepartmentID")
        }
        if(req.query.hasOwnProperty("DepartmentID")&&req.query.hasOwnProperty("KRA_ID")&&req.query.hasOwnProperty("KPI_ID")){
            for(let kra=0; kra<data[0].KRA.length; kra++){
                for(let kpi=0; kpi<data[0].KRA[kra].KPI.length; kpi++){
                    if(data[0].KRA[kra].KPI[kpi].KPI_ID==req.query.KPI_ID){
                        res.json(data[0].KRA[kra].KPI[kpi].KPI_Data)
                        console.log("KPI_ID Data Gotcha!!!")
                        return
                    }
                }
            }
        }
        if(req.query.hasOwnProperty("KRA_ID")&&req.query.hasOwnProperty("DepartmentID")){
            for(let kra=0; data[0].KRA.length; kra++){
                if(data[0].KRA[kra].KRA_ID==req.query.KRA_ID){
                    res.json(data[0].KRA[kra].KPI)
                    console.log("Got the KRA Data")
                    return
                }
            }
        }
        res.json(data)
    }catch(err){
       res.json(err);
    }
    
})
router.get('/:DepartmentID/:KRA_ID',async(req,res)=>{
    res.send(req.params)
})
router.post('/', async(req,res)=>{
    const data = new KRA_DEP({
        DepartmentID: req.body.DepartmentID,
        Department: req.body.Department,
        DepartmentSuperVisior: req.body.DepartmentSuperVisior,
        TodaysDate: req.body.TodaysDate,
        ReviewerName: req.body.ReviewerName,
        ReviewerTitle: req.body.ReviewerTitle,
        LastRevisied: req.body.LastRevisied,
        DepartmentMission:{
            Description:req.body.DepartmentMission.Description,
            Goal:req.body.DepartmentMission.Goal,
            Objectivies:req.body.DepartmentMission.Objectivies
        },
        GrowthPlan:{
            Description: req.body.GrowthPlan.Description
        },
        KRA:[{
            KRA_ID:req.body.KRA[0].KRA_ID,
            KPI:
            [
                {
                KPI_ID:req.body.KRA[0].KPI[0].KPI_ID,
                KPI_Data:{
                    Description:req.body.KRA[0].KPI[0].KPI_Data.Description,
                    Result: req.body.KRA[0].KPI[0].KPI_Data.Result,
                    Goal : req.body.KRA[0].KPI[0].KPI_Data.Goal
                }
                }
            ]
        }]
      })
      try{
          const temp = await data.save();
          console.log("Posted")
          res.json(temp)
      }catch(err){
          res.send(err)
      }
})
router.patch('/',async(req,res)=>{
    const data  = await KRA_DEP.find({ DepartmentID : req.query.DepartmentID})
    if(req.body.hasOwnProperty("KRA_ID")){
        let flag=0;
        for(let kra=0; kra<data[0].KRA.length; kra++){
            if(data[0].KRA[kra].KRA_ID==req.body.KRA_ID){
                data[0].KRA[kra]=req.body
                flag=1 
                console.log("KRA Updated")
                break
            }
        }
        if(flag==0){
            data[0].KRA.push(req.body)
            console.log("KRA Inserted")
        }
        data[0].markModified('KRA')
        const temp = await data[0].save()
        res.json(temp)
        return
    }
    else if(req.body.hasOwnProperty("KPI_ID")){
        let flag =0;
        for(let kra=0; kra<data[0].KRA.length; kra++){
            if(data[0].KRA[kra].KRI_ID==req.query.KRI_ID){
                for(let kpi=0; kpi<data[0].KRA[kra].KPI.length; kpi++){
                    if(data[0].KRA[kra].KPI[kpi].KPI_ID==req.body.KPI_ID){
                        data[0].KRA[kra].KPI[kpi]=req.body
                        console.log("KPI updated")
                        flag=1;
                        break;
                    }
                }
                if(flag===0){
                    data[0].KRA[kra].KPI.push(req.body)
                    console.log("KPI inserted")
                }
                data[0].markModified("KPI")
                const temp = await data[0].save()
                res.json(temp)
                return
            }
        }
    }

   
})

module.exports = router