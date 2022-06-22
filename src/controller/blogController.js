const { model } = require("mongoose");
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")

const createBlog = async function (req, res) {
    try {
        let data = req.body;
        if(!data){
            return res.status(400).send({msg:"Insert Data : BAD REQUEST"})
        }
        if(!data.title){
            return res.status(400).send({msg:"Enter Title"})
        }
        if(!data.body){
            return res.status(400).send({msg:"Enter Body"})
        }
        if(!data.tags){
            return res.status(400).send({msg:"Enter tags"})
        }
        if(!data.category){
            return res.status(400).send({msg:"Enter Category"})
        }
        if(!data.subcategory){
            return res.status(400).send({msg:"Enter subcategory"})
        }
        if(!data.authorId){
            return res.status(400).send({msg:"Enter Valid Author Id"})
        }
        let author=await authorModel.findById(data.authorId)
        if(!author){
            return res.status(400).send({status:false, msg:"Author id is not vaild"})
        }


        let savedData = await blogModel.create(data);
        res.status(201).send({ msg: savedData });
    }
    catch (err) {
        res.status(500).send({ msg: "server error", error: err })
    }
};
module.exports.createBlog = createBlog



const getBlogData = async function (req, res) {
    try {
        let allBlogs = await blogModel.find({ isDeleted: true })
        if (allBlogs.length > 0) {

            let author=await blogModel.findOne({authorId:req.query.authorId})
            if(!author){
                return res.status(400).send({status:false, msg:"Author id is not vaild"})
            }
    // authorId Validation
            req.query.isDeleted=false
            let updatedData= await blogModel.find(req.query)
            if(updatedData.length>0){
                res.status(200).send({ status: true, data: updatedData })
            }
            else{
                res.status(404).send({  status: false, msg: "No blog found"})

            }
            
        }
    }
    catch (err) {
        console.log("This is the error", err)
        res.status(500).send({ msg: "server error", error: err })
    }
}
module.exports.getBlogData = getBlogData





const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let blog = await blogModel.findOne({ _id: blogId , isDeleted: false })
        if (!blog) { return res.status(404).send({ status: false, msg: "blog not found" }) }
        let data = req.body
        if (data.tags) {
            data.tags = blog.tags.concat(data.tags)
        }
        if (data.subcategory) {
            data.subcategory = blog.subcategory.concat(data.subcategory)
        }
        if (data.isPublished === true) { data.publishedAt = Date.now() }

        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: data }, { new: true })
        res.status(200).send(updatedBlog)
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }

}

module.exports.updateBlog=updateBlog



let deleted = async function(req,res){
    try{
        let id = req.params.blogId
        if (!id) return res.status (404).send({sataus:false,msg:"blog id is required"})
        let idvalidation = await blogModel.findById(id)
        if (!idvalidation) return res.sataus(404).send({status:false,msg:"invalid blog id"})
        if (idvalidation.isDeleted == true) return res.status(404).send({status:false,msg:"blog is already deleted"})
        if (idvalidation.isDeleted == false){
            let validetion = await blogModel.findOneAndUpdate({_id:id},{$set:{isDeleted: true,deletedAt: moment().format()}})
            return res.status(200).send({ status: true, msg: "blog is deleted successfully"})

        }
        
    } catch (err){
        res.status(500).send({ status: false,msg:err.message});
    }

}

module.exports.deleted=deleted

let queryDelete = async function(req,res){
    try{
        let data = req.query
        let filter = {...data}
        if (!data) return res.status(400).send({ status:false,msg:"query params is not given"})
        let blogvalidation =  await blogModel.findOne(filter)
        if(!blogvalidation) returnres.req(404).send({status:false,msg: "blog does not exist"})
        if(blogvalidation.isDeleted == true) return res.sataus(404).send({status: false,msg:"blog is all ready deleted"})
        if (blogvalidation.isDeleted == false){
            let idlist = blogvalidation._id
            console.log(idlist)
            let deletion = await blogsmodel.findOneAndUpdate(filter,{$set:{ isDeleted:true,deletedAt: moment().format()}})
            return res.status(200).send({status:true,msg:"blog is deleted sucessfully"})
        }
    } catch (err){
        res.status(500).send({ status: false,msg:err.message});
    }
    
    }
    
    module.exports.queryDelete=queryDelete
    