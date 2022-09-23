const express = require('express')
const mongoose = require('mongoose')
const route = require("./route/route")

const app = express()
const port = process.env.PORT || 3000 // PORT HERE


mongoose.connect("/* mongodb cluster here */",{
    useNewUrlParser:true
})
.then( ()=> console.log("mongodb is connect successfully"))
.catch( () => console.log(err))


app.use("/res1", function(req,res){
    res.send("Hello World")
})

app.use("/", route)

app.listen(port, function(){
    console.log("Express is running on port- " + (process.env.PORT || 3000))
})