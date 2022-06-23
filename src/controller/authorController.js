const { response } = require("express");
const authorModel = require("../models/authorModel");
const validator = require('validation')
const jwt = require('jsonwebtoken')
const { isValidName, isValidTitle, isValidEmail, isValidPassword, isValidObjectId, isBoolean, isValid } = require("../middleware/validation")


const createAuthor = async function (req, res) {
    try {
        let {fname,lname,title,email,password} = req.body;
        
        if (!req.body) {
            return res.status(404).send({ msg: "Insert Data : BAD REQUEST" })
        }
        if (!isValid(fname)) {
            return res.status(404).send({ msg: "Enter First Name" })
        }
        if (!isValidName(fname)) {
            return res.status(400).send({ msg: "fname only take alphabets" })
        }
        if (!isValid(lname)) {
            return res.status(404).send({ msg: "Enter Last Name" })
        }
        if (!isValidName(lname)) {
            return res.status(400).send({ msg: "lname only take alphabets" })
        }
        if (!isValid(title)) {
            return res.status(404).send({ msg: "Create Title Name" })
        }
        if (!isValidTitle(title)) {
            return res.status(404).send({ msg: "Enter title from this ['Mr', 'Mrs', 'Miss']" })
        }
        if (!isValid(email)) {
            return res.status(404).send({ msg: "Enter Email-Id" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ msg: "enter valid email" })
        }
        if (!isValid(password)) {
            return res.status(404).send({ msg: "Create Password" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ msg: "Minimum eight characters, at least one letter and one number" })
        }
        let savedData = await authorModel.create(data);
        return res.status(201).send({ msg: savedData });
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }

};

const loginAuthor = async function (req, res) {

    try {
        let emailId = req.body.emailId;
        let password = req.body.password;
        if(!emailId) return res.status(400).send({status:false,msg:"enter emailId"})
        if(!password) return res.status(400).send({status:false,msg:"enter password"})
        let author = await authorModel.findOne({ $and:[{emailId: emailId}, {password: password }]});
        if (!author)
            return res.status(400).send({
                status: false,
                msg: "email or the password is not correct",
            });
        let token = jwt.sign(
            {
                authorId: author._id.toString(),
            },
            "group-25"
        );
        return res.status(201).send({ status: true, token: token });
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }


}
module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor
