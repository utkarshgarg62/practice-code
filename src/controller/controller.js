const userModel = require("../model/userModel")

const api = function(req,res){
    res.send("Hello World.. i am utkarsh garg")
    // GET API HERE
}
module.exports.api= api


const api2 = function(req,res){
    res.send("api2")
    // GET API HERE
}
module.exports.try1= api2