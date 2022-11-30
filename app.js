const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    let today = new Date();
    var options = {
        weekday:"long",
        day: "numeric",
        month: "long",
    }
    let a = today.toLocaleDateString('en-UK',options);
    res.render("list",{
        dayz: a
    });
    // console.log("rendered list.ejs successfully!");
});

// app.post('/',function(req,res){
//     let item = req.body.newItem;
//     // console.log(item);
//     items.push(item);
//     res.redirect('/');
// })

app.listen(3000,function(){
    console.log("listening on port 3000");
})