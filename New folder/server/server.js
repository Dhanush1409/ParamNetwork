const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const app = express()
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
const url = 'mongodb://localhost:27017/KRA'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
var con = mongoose.connection
con.on('open',(err,result)=>{
    if(err){
        console.log("Unable to connect")
    }else
    console.log("Connected to Mongodb server")
})
const schema = require('../Schema/schema')
app.use('/gql',graphqlHTTP ({
    schema,
    graphiql:true
}))
app.listen(8081,()=>{
    console.log("Server in connected")
})