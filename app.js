// // connect to DB here
const mongoose = require('mongoose');
// change the ip here
let projName = "projKanban"
const db_name = 'mongodb://127.0.0.1:27017/'+projName;
mongoose.connect(db_name, {
    useNewUrlParser: true,
         useUnifiedTopology: true,})   
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

//   Setup proj Schema
const projSchema = new mongoose.Schema({
    task: {type:String,
    required:[true,"why no task?"]},

    taskDateCreated: String,
    taskDesc: String,
    taskStatus: String
  });
  const task = mongoose.model("task",projSchema);

// Web application code here
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.get("/",function(req,res){
    task.find(function(err,foundItem){
        if (err){
            console.log(err);
        }else{
            res.render("list",{
                listItem:foundItem.filter(obj =>obj.taskStatus ==="Scoping"),
                wipList:foundItem.filter(obj =>obj.taskStatus ==="Work in Progress"),
                completedList:foundItem.filter(obj =>obj.taskStatus ==="Completed")
            });
        };
        
    })
});

app.post('/api/update',(req,res)=>{
    task.updateOne({"_id":req.body._id.trim()},{"taskStatus":req.body.taskStatus.trim()},
    (err,docs)=>{
        if (err){
            console.log(err);
        }else{
            console.log(`${docs} has been updated`);
            app.get('/',(req,res)=>{
                task.find(function(err,foundItem){
                    if (err){
                        console.log(err);
                    }else{
                        res.render("list",{
                            listItem:foundItem.filter(obj =>obj.taskStatus ==="Scoping"),
                            wipList:foundItem.filter(obj =>obj.taskStatus ==="Work in Progress"),
                            completedList:foundItem.filter(obj =>obj.taskStatus ==="Completed")
                        });
                    };
                    
                })
            })
        };
    });
    res.redirect('/');
});

app.post('/',function(req,res){
    let item = req.body.newItem;
    newTask = {
        task: item,
        // taskDesc: String,
        taskDateCreated: (new Date()).toLocaleDateString('en-UK'),
        taskStatus: "Scoping"
    };
    task.insertMany([newTask],function(err){
    if (err){
        console.log(err);}
        else {
        console.log(`Saved task ${newTask}!`);
        };
    }
    );
    res.redirect('/');
})

app.post('/delete',function(req,res){
    const checkedItemId = req.body.taskToDelete;
    task.findByIdAndRemove(checkedItemId,function(err){
        if (err){
            console.log(err);
        }else {console.log(`Successfuly deleted item ID: ${checkedItemId}`)};
    })
    res.redirect('/');
})

app.listen(3000,function(){
    console.log("listening on port 3000");
})