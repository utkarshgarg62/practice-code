const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const {isValidObjectId} = require('../middleware/validation')


//====================================================Authentication========================================================================


const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "group-25");
        if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });

        next()
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


//====================================================Authorization========================================================================



const newAuth = async function (req, res, next) {
   
    try {
      
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "group-25");
       

        let fromBodyAuthorId = req.body.authorId
        let authorLoggedIn = decodedToken.authorId
        let fromParamsBlogId = req.params.blogId      

       
      if(fromBodyAuthorId) { 
        if(!isValidObjectId(fromBodyAuthorId)) return res.status(400).send({status:false,msg:"enter valid blogId"})
        let author = await authorModel.findById(fromBodyAuthorId)
         if (!author) {
            return res.status(400).send({ status: false, msg: "Author  is not exists" })
         }
        if (fromBodyAuthorId != authorLoggedIn) {
            return res.status(403).send({ status: false, msg: 'author logged is not allowed to create blog for another authorId' })
        }
        next()
       }

       if(fromParamsBlogId){
        if(!isValidObjectId(fromParamsBlogId)) return res.status(400).send({status:false,msg:"enter valid blogId"})
        let blog = await blogModel.findOne({ _id: fromParamsBlogId, isDeleted: false }).select({ authorId: 1, _id: 0 })
        if (!blog) return res.status(404).send({ status: false, msg: "blog  not found " })
        if (blog.authorId != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested users data' })
        next()
       }
 
  
       
    }

    catch (error) {
  
        res.status(500).send(error.message)
  
    }
}




//====================================================Authorization for delete by query========================================================================




const forDeleteByQuery = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "group-25");

        let id = req.query.authorId

        let authorLoggedIn = decodedToken.authorId
        
        if(id){
            if(!isValidObjectId(id))return res.status(400).send({status:false,msg:"Enter Valid authorId"})
        if (id != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested users data' })
        }
        if (Object.keys(req.query).length < 1) return res.status(400).send({ status: false, msg: "query params is not given" })
        
        if(!id) req.query.authorId = authorLoggedIn
        next()
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }


}







module.exports.authenticate = authenticate
module.exports.newAuth=newAuth
module.exports.forDeleteByQuery = forDeleteByQuery
