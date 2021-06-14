var express = require('express');
var cookiesParser = require('cookie-parser');
var app = express();
app.use(cookiesParser());
app.get('/cookie',function(req,res){
    console.log("Cookies ",req.cookies);
})
app.listen(8081);