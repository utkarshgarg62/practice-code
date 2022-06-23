const jwt = require("jsonwebtoken")



const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "group-25");
        if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });
        next()
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }    
}

const authorization = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "group-25");
        let blogToBeModified = req.query.authorId
        let authorLoggedIn = decodedToken.authorId
        if (blogToBeModified != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested users data' })
        next()
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
    

}

module.exports.authenticate = authenticate
module.exports.authorization = authorization