const { response } = require("express");
const authorModel = require("../model/authorModel");

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let savedData = await authorModel.create(data);
        return res.status(201).send({ msg: savedData });
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }

};
module.exports.createAuthor = createAuthor