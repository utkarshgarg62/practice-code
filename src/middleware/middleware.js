const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");
const mongoose =require('mongoose')


//====================================================Authentication========================================================================


const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "group-25");
        if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });

        next()
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


//====================================================Authorization========================================================================


const authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "group-25");
        let blogId = req.params.blogId
        let blog = await blogModel.findById(blogId).select({ authorId: 1, _id: 0 })
        if (!blog) return res.status(401).send({ status: false, msg: "blog is not exists" })
        let authorLoggedIn = decodedToken.authorId
        if (blog.authorId != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested users data' })
        next()
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }


}

const forCreateBlogAuth = async function (req, res, next) {
    let token = req.headers["x-api-key"];
    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
    let decodedToken = jwt.verify(token, "group-25");
    if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });

    let authorLoggedIn = decodedToken.authorId
    let userId = req.body.authorId

    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Enter a Valid authorId or author not found" })
    if (userId != authorLoggedIn) {
        return res.status(403).send({ status: false, msg: 'author logged is not allowed to create blog for another authorId' })
    }
    next()

}


module.exports.authenticate = authenticate
module.exports.authorization = authorization
module.exports.forCreateBlogAuth = forCreateBlogAuth