const blogModel = require("../models/blogModel")

const createBlog = async function (req, res) {
    try {
        let data = req.body;
        let savedData = await blogModel.create(data);
        console.log(req.newAtribute);
        res.status(201).send({ msg: savedData });
    }
    catch (err) {
        console.log("This is the error", err)
        res.status(500).send({ msg: "server error", error: err })
    }
};
module.exports.createBlog = createBlog