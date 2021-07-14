const express = require ('express')
const router = express.Router()
const KRA_DEP = require("../modules/KRA_DEP")

router.get('/:DepartmentID',async(req,res)=>{
    console.log(req.params)
    const data = await KRA_DEP.find(req.params).lean()
    res.json(data)
})
router.get("/:DepartmentID/:KRA_ID",async (req,res)=>{
    const data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID ){
            res.json(data[0].KRA[kra])
            return
        }
    }
    res.json("404 NOT FOUND")
})
router.get("/:DepartmentID/:KRA_ID/:KPI_ID",async(req,res)=>{
    const data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID ){
            for(let kpi=0; kpi<data[0].KRA[kra].KPI.length; kpi++){
                if(data[0].KRA[kra].KPI[kpi].KPI_ID==req.params.KPI_ID ){
                    res.json(data[0].KRA[kra].KPI[kpi].KPI_Data)
                    return
                }
            }
        }
    }
    res.json("File Not Found")
}) 

router.post('/', async(req,res,err)=>{
    var cursor = await KRA_DEP.find({},{"DepartmentID":1}).sort({DepartmentID:-1}).limit(1)
    console.log(cursor)
    const newdata = new KRA_DEP(req.body)
    if(err){
        try{
            newdata.DepartmentID = cursor[0].DepartmentID + 1
        }
        catch(err){
            newdata.DepartmentID=1
        }
        
    }
    if(req.body.hasOwnProperty("KRA")){
        for(let kra=0; kra<newdata.KRA.length; kra++){
            newdata.KRA[kra].KRA_ID= kra + 1
            if(req.body.KRA[kra].hasOwnProperty("KPI")){
                for(let kpi=0; kpi<newdata.KRA[kra].KPI.length; kpi++){
                    newdata.KRA[kra].KPI[kpi].KPI_ID= kpi + 1
                }
            }
        }
    }
    try{
          const temp = await newdata.save()
          console.log("Posted")
          res.json(temp)
    }catch(err){
          res.send(err)
    }
})
router.post('/changes/:DepartmentID',async(req,res)=>{
    var data = await KRA_DEP.update(req.params,req.body,(err,result)=>{
        if(err){
            res.send("404 file not found")
        }else{
            res.send("Updated")
        }
    })
})
router.post('/changes/:DepartmentID/:KRA_ID',async(req,res,err)=>{
    var data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID - 1){
            req.body.KRA_ID = data[0].KRA[kra].KRA_ID
            for(let kpi=0; kpi<req.body.KPI.length; kpi++){
               req.body.KPI[kpi].KPI_ID = kpi + 1
            }
            data[0].KRA[kra]=req.body
            data[0].markModified("KRA")
            var temp = await data[0].save();
            res.json(temp)
            return
        }
    }
    res.json('file not found')
})
router.post('/changes/:DepartmentID/:KRA_ID/:KPI_ID',async(req,res,err)=>{
    var data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID ){
            for(let kpi=0; kpi<data[0].KRA[kra].KPI.length; kpi++){
                if(data[0].KRA[kra].KPI[kpi].KPI_ID==req.params.KPI_ID ){
                    if(req.body.KPI_Data.hasOwnProperty("Description")){
                        data[0].KRA[kra].KPI[kpi].KPI_Data.Description = req.body.KPI_Data.Description
                    }
                    if(req.body.KPI_Data.hasOwnProperty("Result")){
                        data[0].KRA[kra].KPI[kpi].KPI_Data.Result = req.body.KPI_Data.Result
                    }
                    if(req.body.KPI_Data.hasOwnProperty("Goal")){
                        data[0].KRA[kra].KPI[kpi].KPI_Data.Goal = req.body.KPI_Data.Goal
                    }
                    data[0].markModified("KRA")
                    var temp = await data[0].save()
                    res.json(temp)
                    return
                }
            }
        }
    }
    res.send("404 File not found")
})
router.post('/delete/:DepartmentID',async(req,res)=>{
    var data = await KRA_DEP.findOneAndDelete(req.params)
    var cursor = await KRA_DEP.find().where("DepartmentID").gte(temp).exec()
    for(let i=0; i<cursor.length; i++){
        cursor[i].DepartmentID = cursor[i].DepartmentID - 1
        cursor[i].markModified("DepartmentID")
        cursor[i].save()
    }
    res.json(data)
})
router.post('/delete/:DepartmentID/:KRA_ID',async(req,res)=>{
    var data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    var temp = req.params.KRA_ID - 1
    try{
        data[0].KRA.splice(temp,1)
        for(let kra=temp ; kra<data[0].KRA.length; kra++){
            data[0].KRA[kra].KRA_ID = data[0].KRA[kra].KRA_ID  - 1
        }
        data[0].markModified("KRA")
        var temp = await data[0].save()
        res.send(temp)
    }catch(err){
        console.log(err)
        res.send("404 File not found")
    }

})
router.post('/delete/:DepartmentID/:KRA_ID/:KPI_ID',async(req,res)=>{
    
    var data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    var kra = req.params.KRA_ID - 1
    var kpi = req.params.KPI_ID - 1
    try{
        delete data[0].KRA[kra].KPI.splice(kpi,1)
        for(let temp = kpi; temp<data[0].KRA[kra].KPI.length; temp++){
            data[0].KRA[kra].KPI[temp].KPI_ID =  data[0].KRA[kra].KPI[temp].KPI_ID - 1
        }
        data[0].markModified("KRA")
        var temp = await data[0].save()
        res.send(temp)
    }catch(err){
        console.log(err)
        res.send("404 file not found")
    }
})
router.post("/newKRA/:DepartmentID",async (req,res)=>{
    var id =0
    var data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    if(data[0].KRA.length==0){
        id=1
    }
    else{
        id = data[0].KRA.length + 1
    }
    for(let kpi=0; kpi<req.body.KPI.length; kpi++){
        req.body.KPI[kpi].KPI_ID = kpi + 1
    }
    req.body.KRA_ID=id
    data[0].KRA.push(req.body)
    data[0].markModified("KRA")
    var temp = await data[0].save()
    res.json(temp)
})
router.post("/newKPI/:DepartmentID/:KRA_ID",async(req,res,err)=>{
    var id = 0
    var data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID - 1){
            if(data[0].KRA[kra].KPI.length == 0 ){
                id = 1
            }else{
                id = data[0].KRA[kra].KPI.length + 1
            }
            req.body.KPI_ID = id
            data[0].KRA[kra].KPI.push(req.body)
            data[0].markModified("KRA")
            var temp = await data[0].save()
            res.json(temp)
            return
        }
    }
})

module.exports = router