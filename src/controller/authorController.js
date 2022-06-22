const { response } = require("express");
const authorModel = require("../models/authorModel");  
const validator = require ('validation')


const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let regex = /^[A-Za-z]+$/
        let re =  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

        if(!data){
            return res.status(404).send({msg: "Insert Data : BAD REQUEST"})
        }
        if(!data.fname){
            return res.status(404).send({msg:"Enter First Name"})
        }
        if(!regex.exec(data.fname)){
            return res.status(400).send({msg:"fname only take alphabets"})
        }
        if(!data.lname){
            return res.status(404).send({msg:"Enter Last Name"})
        }
        if(!regex.exec(data.lname)){
            return res.status(400).send({msg:"lname only take alphabets"})
        }
        if(!data.title){
           return res.status(404).send({msg :"Create Title Name"}) 
        }
        if(!data.email){
            return res.status(404).send({msg :"Create Valid Email-Id"}) 
        }
        if(!re.exec(data.email)){
            return res.status(400).send({msg:"enter valid email"})
        }
        if(!data.password){
            return res.status(404).send({msg :"Create Password"}) 
        }
        if(data.password.length <= 8){
            return res.status(400).send({msg :"create more than 8 characters password"}) 
        }
        let savedData = await authorModel.create(data);
        return res.status(201).send({ msg: savedData });
    }
    catch (err) {
        res.status(500).send({ msg:err.message })
    }

};
module.exports.createAuthor = createAuthor

