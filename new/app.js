const express = require ('express');
const mongoose = require('mongoose');
//const router = express.router()
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
const url = 'mongodb://localhost:27017/KRA'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
var con = mongoose.connection
const kraroutes = require('./routes/KRA')
app.use('/KRA',kraroutes)
con.on('open',()=>{
    console.log("Connected to Mongodb server")
})
app.listen(8081,()=>{
    console.log("Server started")
})