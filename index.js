var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    var name= req.body.name
    var age=req.body.age
    var gender=req.body.gender
    var address=req.body.address
    var phno=req.body.phno
    var email=req.body.email
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "gender":gender,
        "address":address,
        "phno":phno,
        "email":email, 
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_successful.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")



// var express = require("express");
// var bodyParser=require("body-parser");
// var mongoose = require("mongoose");
// const app=express();

// app.use(bodyParser.json);
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({
//     extended:true
// }))
// mongoose.connect('mongodb://localhost:27017/Database');
// var db=mongoose.connection;
// db.on('error',()=> console.log("Database Connection Error"));
// db.once('open',()=> console.log("Database Connected"));

// app.post("/sign_up",(req,res)=>{
//     var name=res.body.name
//     var age=req=req.body.age
//     var email=req.body.email
//     var phno=req.body.phno
//     var gender=req.body.gender
//     var password = req.body.password 

//     var data={
//         "name":name,
//         "age":age,
//         "email":email,
//         "phno":phno,
//         "gender":gender,
//         "password":password
//     }
//     db.collection('user').insertOne(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log("Record Inserted Successfully")        
//     })
//     return res.redirect('signup_success.html')
// })


// app.get("/",(req,res)=>{
//     res.set({
//         "Allow-access-Allow-Origin":'*'
//     })
//     return res.redirect('index.html' )
// }).listen(3000);

// console.log("Listing on port 3000");