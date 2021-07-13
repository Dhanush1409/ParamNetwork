const express = require ('express')
const router = express.Router()
const KRA_DEP = require("../modules/KRA_DEP")
const KRA_IND = require("../modules/KRA_IND")

router.get('/Department/:DepartmentID',async(req,res)=>{
    console.log(req.params)
    const data = await KRA_DEP.find(req.params).lean()
    res.json(data)
})
router.get("/Department/:DepartmentID/:KRA_ID",async (req,res)=>{
    const data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID}).lean()
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID - 1){
            res.json(data[0].KRA[kra])
            return
        }
    }
    res.json("404 NOT FOUND")
})
router.get("/Department/:DepartmentID/:KRA_ID/:KPI_ID",async(req,res)=>{
    const data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID - 1){
            for(let kpi=0; kpi<data[0].KRA[kra].KPI.length; kpi++){
                if(data[0].KRA[kra].KPI[kpi].KPI_ID==req.params.KPI_ID - 1){
                    res.json(data[0].KRA[kra].KPI[kpi].KPI_Data)
                    return
                }
            }
        }
    }
    res.json("File Not Found")
}) 
router.get("/Individual/Department/:DepartmentID",async(req,res)=>{
    var data =  await KRA_IND.find(req.parms)
    res.json(data)
})
router.get("/Individual/:EmployeeID",async(req,res)=>{
    var data = await KRA_IND.find(req.params)
    res.json(data)
})
router.get("/Individual/:EmployeeID/:KRA_ID",async(req,res)=>{
    const data = await KRA_IND.find({EmployeeID:req.params.EmployeeID}).lean()
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID - 1){
            res.json(data[0].KRA[kra])
            return
        }
    }
    res.json("404 NOT FOUND")
})
router.get("/Individual/:EmployeeID/:KRA_ID/:KPI_ID",async(req,res)=>{
    const data = await KRA_IND.find({EmployeeID:req.params.EmployeeID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID - 1){
            for(let kpi=0; kpi<data[0].KRA[kra].KPI.length; kpi++){
                if(data[0].KRA[kra].KPI[kpi].KPI_ID==req.params.KPI_ID - 1){
                    res.json(data[0].KRA[kra].KPI[kpi].KPI_Data)
                    return
                }
            }
        }
    }
    res.json("File Not Found")
})
router.post('/Department', async(req,res,err)=>{
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
router.post('/Individual', async(req,res,err)=>{
    var cursor = await KRA_IND.find({},{"EmployeeID":1}).sort({EmployeeID:-1}).limit(1)
    const newdata = new KRA_IND(req.body)
    if(err){
        try{
            newdata.EmployeeID = cursor[0].EmployeeID + 1
        }catch(err){
            newdata.EmployeeID = 1
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
        console.log("Posted in Individual")
        res.json(temp)
    }catch(err){
        res.send(err)
    }
})

router.post('/Department/changes/:DepartmentID/:KRA_ID',async(req,res,err)=>{
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
router.post('/Department/changes/:DepartmentID/:KRA_ID/:KPI_ID',async(req,res,err)=>{
    var data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID - 1){
            for(let kpi=0; kpi<data[0].KRA[kra].KPI.length; kpi++){
                if(data[0].KRA[kra].KPI[kpi].KPI_ID==req.params.KPI_ID -1){
                    data[0].KRA[kra].KPI[kpi].KPI_Data=req.body
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
router.post('/Individual/changes/:EmployeeID/:KRA_ID',async(req,res,err)=>{
    var data = await KRA_IND.find({EmployeeID:req.params.EmployeeID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID - 1){
            req.body.KRA_ID = req.params.KRA_ID
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
    
})
router.post('/Individual/changes/:EmployeeID/:KRA_ID/:KPI_ID',async(req,res,err)=>{
    var data = await KRA_IND.find({EmployeeID:req.params.EmployeeID})
    for(let kra=0; kra<data[0].KRA.length; kra++){
        if(data[0].KRA[kra].KRA_ID==req.params.KRA_ID - 1){
            for(let kpi=0; kpi<data[0].KRA[kra].KPI.length; kpi++){
                if(data[0].KRA[kra].KPI[kpi].KPI_ID==req.params.KPI_ID - 1){
                    data[0].KRA[kra].KPI[kpi].KPI_Data=req.body
                    data[0].markModified("KRA")
                    var temp = await data[0].save()
                    res.json(temp)
                    return
                }
            }
        }
    }
})
router.post('/Department/delete/:DepartmentID',async(req,res)=>{
    var data = await KRA_DEP.findOneAndDelete(req.params)
    var temp = req.params.DepartmentID
    var cursor = await KRA_DEP.find().where("DepartmentID").gte(temp).exec()
    for(let i=0; i<cursor.length; i++){
        cursor[i].DepartmentID = cursor[i].DepartmentID - 1
        cursor[i].markModified("DepartmentID")
        cursor[i].save()
    }
    res.json(cursor)
})
router.post('/Individual/delete/:EmployeeID',async(req,res)=>{
    await KRA_IND.findOneAndDelete(req.params,(err,result)=>{
        if(err){
            res.send("404 file not found")
            return
        }
        console.log("Deleted")
    })
    var temp = req.params.EmployeeID
    var cursor = await KRA_IND.find({EmployeeID:{ $gte : temp}})
    for(let i=0; i<cursor.length; i++){
        cursor[i].EmployeeID = cursor[i].EmployeeID - 1
        cursor[i].markModified("EmployeeID")
        cursor[i].save()
    }
    res.json(cursor)
})
router.post('/Department/delete/:DepartmentID/:KRA_ID',async(req,res)=>{
    var data = await KRA_DEP.find({DepartmentID:req.params.DepartmentID})
    var temp = req.params.KRA_ID - 1
    try{
        delete data[0].KRA[temp].KPI
        delete data[0].KRA[temp]
        for(let kra=temp; kra<=data[0].KRA.length; kra++){
            data[0].KRA[kra].KRA_ID = data.KRA[kra].KRA_ID
        }
        data[0].markModified("KRA")
        var temp = await data[0].save()
        res.send(temp)
    }catch(err){
        res.send("404 File not found")
    }

})
router.post('/Department/delete/:DepartmentID/:KRA_ID/:KPI_ID',async(req,res)=>{
    var data = await KRA_DEP.find({DepartmentID:req.parmas.DepartmentID})
    var kra = req.params.KRA_ID - 1
    var kpi = req.params.KPI_ID - 1

    try{
        delete data[0].KRA[kra].KPI[kpi]
        delete data[0].KRA[kra].KPI[kpi].KPI_Data
        for(let temp = kpi; temp<=data[0].KRA[kra].KPI.length; temp++){
            data[0].KRA[kra].KPI[temp].KPI_ID =  data[0].KRA[kra].KPI[temp].KPI_ID - 1
        }
        data[0].markModified("KRA")
        var temp = await data[0].save()
        res.send(temp)
    }catch(err){
        res.send("404 file not found")
    }
})
router.post("/Department/newKRA/:DepartmentID",async (req,res)=>{
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
router.post("/Individual/newKRA/:EmployeeID",async(req,res)=>{
    var id =0
    var data = await KRA_IND.find({EmployeeID:req.params.EmployeeID})
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
router.post("/Department/newKPI/:DepartmentID/:KRA_ID",async(req,res,err)=>{
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
router.post("/Individual/newKPI/:EmployeeID/:KRA_ID",async(req,res,err)=>{
    var id = 0
    var data = await KRA_IND.find({EmployeeID:req.params.EmployeeID})
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