const { response } = require("express");
const authorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        if(!data){
            return res.status(404).send({msg: "Insert Data : BAD REQUEST"})
        }
        if(!data.fname){
            return res.status(404).send({msg:"Enter First Name"})
        }
        if(!data.lname){
            return res.status(404).send({msg:"Enter Last Name"})
        }
        if(!data.title){
           return res.status(404).send({msg :"Create Title Name"}) 
        }
        if(!data.email){
            return res.status(404).send({msg :"Create Valid Email-Id"}) 
        }
        if(!data.password){
            return res.status(404).send({msg :"Create Unique Password"}) 
        }
        let savedData = await authorModel.create(data);
        return res.status(201).send({ msg: savedData });
    }
    catch (err) {
        res.status(500).send({ msg:"Server Error", error:err })
    }

};
module.exports.createAuthor = createAuthor

