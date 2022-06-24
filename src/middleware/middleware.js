const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");
const mongoose =require('mongoose');
const authorModel = require("../models/authorModel");


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







const getBlogAuth = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "group-25");

        let id = req.query.authorId

        let authorLoggedIn = decodedToken.authorId
        if(!id) id=authorLoggedIn

        let author = await authorModel.find({authorId:id})
        if(!author) return res.status(401).send({ status: false, msg: "No author present" })


        let blog = await blogModel.find({authorId:id})
        if (!blog) return res.status(401).send({ status: false, msg: "blog is not exists" })

        if (id != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested users data' })
        
        req.query.authorId=authorLoggedIn

        next()
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }


}





const forDeleteByQuery = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "group-25");

        let id = req.query.authorId

        let authorLoggedIn = decodedToken.authorId
        if(!id) id=authorLoggedIn

        let author = await authorModel.find({authorId:id})
        if(!author) return res.status(401).send({ status: false, msg: "No author present" })


        let blog = await blogModel.findOne({$and:[req.query,{authorId:id}]}).select({authorId:1,_id:0})
        if (!blog) return res.status(401).send({ status: false, msg: "blog is not exists" })

        if (blog.authorId != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested users data' })

        next()
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }


}






module.exports.authenticate = authenticate
module.exports.authorization = authorization
module.exports.forCreateBlogAuth = forCreateBlogAuth
module.exports.getBlogAuth=getBlogAuth
module.exports.forDeleteByQuery = forDeleteByQuery





const newAuth = async function (req, res, next) {
   
    try {
      
        let token = req.headers["x-api-key"]
      
        if (!token)return res.status(400).send({ status: false, msg: "token not found" })
      
        let decodedToken = jwt.verify(token, "group-25")
      
        if (!decodedToken) return res.status(401).send({ status: false, msg: "invalid token" })

        let blog_Id = req.params.blogId
        let userId = decodedToken.authorId
        let data = req.query; 

        if(blog_Id){
        if (!mongoose.isValidObjectId(blog_Id)) return res.status(400).send({ status: false, msg: "Enter a Valid BlogId"})
        let authorData=await blogModel.findOne({_id:blog_Id,authorId:userId})
        if (!authorData)return res.send({ status: false, msg:"you are not authorized" })
        }

        
       
        if(data.authorId){
            if (!mongoose.isValidObjectId(data.authorId)) return res.status(400).send({ status: false, msg: "Enter a Valid authorId"})
            if(data.authorId!=userId)return res.send({ status: false, msg:"you are not authorized" })  
        }
  
        
        if(data.category){
            let authorData=await blogModel.find({category:data.category,authorId:userId})
            if (!authorData.length)return res.send({ status: false, msg:"you are not authorized" })  
        }

        if(data.subcategory){
            let authorData=await blogModel.find({subcategory:data.subcategory,authorId:userId})
            if (!authorData.length)return res.send({ status: false, msg:"you are not authorized" }) 
        }
  
        if(data.tags){
            let authorData=await blogModel.find({tags:data.tags,authorId:userId})
            if (!authorData.length)return res.send({ status: false, msg:"you are not authorized" })   
        }
  
        if(data.isPublished){
            let authorData=await blogModel.find({isPublished:data.isPublished,authorId:userId})
            if (!authorData.length)return res.send({ status: false, msg:"you are not authorized" })
        }
  
        next()
  }

    catch (error) {
  
        res.status(500).send(error.message)
  
    }
}


module.exports.newAuth=newAuth