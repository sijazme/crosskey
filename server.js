
var express = require('express');

var bodyParser = require("body-parser");


var task = ["buy socks", "go to gym"];

var complete = ["cook meal"];

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static("public"));

app.set('view engine', 'ejs');

// set the body parser
app.use(bodyParser.urlencoded({ extended: true }));


// ADD NEW TASK 

app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    console.log("add task  --> " + newTask);    
    task.push(newTask);    
    res.redirect("/");
});


app.get("/", function (req, res) {
    res.render("index", { task: task, complete: complete });
});


app.post('/updatetask', function (req, res) {

    console.log("update task[" + req.body.i + "] = " + req.body.value);
    var index = parseInt(req.body.i);
    var value = req.body.value;
    task[index] = value;
    
    res.redirect("/");
});


app.get("/removetask", function (req, res) {

    var index = parseInt(req.query.i);

    var deleteTask = task[index];

    console.log("delete task --> " + deleteTask);

    task.splice(index, 1);

    res.redirect("/");
});

app.get("/marktask", function (req, res) {

    var index = parseInt(req.query.i);

    var completeTask = task[index];  //req.body.check;

    console.log("mark complete --> " + completeTask);


    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exist in the task when checked, then remove using the array splice method
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});


app.listen(port, function () {
    console.log('server listen start port 8080')
});