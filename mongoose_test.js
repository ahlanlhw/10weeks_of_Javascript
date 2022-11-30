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

const projSchema = new mongoose.Schema({
task: {type:String,
required:[true,"why no task?"]},

taskDateCreated: String,
taskDesc: String,
taskStatus: String
});

// These lines query and returns the output
const task = mongoose.model("task",projSchema);
task.find({"taskStatus":"Scoping"}).lean().exec(function(err,docs){
    console.log(docs);
})