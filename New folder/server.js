const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const app = express()
const schema = require('./Schema/schema')
app.use('/gql',graphqlHTTP ({
    schema,
    graphiql:true
}))
app.listen(8081,()=>{
    console.log("Server in connected")
})