const { response } = require("express");
const authorModel = require("../models/authorModel");
const validator = require('validation')
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let regex = /^[A-Za-z]+$/
        let re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

        if (!data) {
            return res.status(404).send({ msg: "Insert Data : BAD REQUEST" })
        }
        if (!data.fname) {
            return res.status(404).send({ msg: "Enter First Name" })
        }
        if (!regex.exec(data.fname)) {
            return res.status(400).send({ msg: "fname only take alphabets" })
        }
        if (!data.lname) {
            return res.status(404).send({ msg: "Enter Last Name" })
        }
        if (!regex.exec(data.lname)) {
            return res.status(400).send({ msg: "lname only take alphabets" })
        }
        if (!data.title) {
            return res.status(404).send({ msg: "Create Title Name" })
        }
        if (!data.email) {
            return res.status(404).send({ msg: "Create Valid Email-Id" })
        }
        if (!re.exec(data.email)) {
            return res.status(400).send({ msg: "enter valid email" })
        }
        if (!data.password) {
            return res.status(404).send({ msg: "Create Password" })
        }
        if (data.password.length <= 8) {
            return res.status(400).send({ msg: "create more than 8 characters password" })
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
        let author = await authorModel.findOne({ emailId: emailId, password: password });
        if (!author)
            return res.status(400).send({
                status: false,
                msg: "email or the password is not corerct",
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
