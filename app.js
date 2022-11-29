const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine','ejs');
app.use(bp.urlencoded({extended:true}));
app.use(express.static('public'))
app.get('/',function(req,res){
    res.send('hello world!')
})
app.listen(3000,function(req,res){
    console.log("listening on port 3000");
})