const blogModel = require("../models/blogModel")
const moment = require('moment');
const { isValid, isValidBlogTitle, isValidObjectId } = require("../middleware/validation");

//====================================================Create Blog Api========================================================================


const createBlog = async function (req, res) {
    try {
        let {title,body,tags,category,subcategory,authorId} = req.body;
        
        if (Object.keys(req.body).length<1) {
            return res.status(400).send({ msg: "Insert Data : BAD REQUEST" })
        }
        if (!isValid(title)) {
            return res.status(400).send({ msg: "Enter Title" })
        }
        if (!isValidBlogTitle(title)) {
            return res.status(400).send({ msg: "create valid title" })
        }
        if (!isValid(body)) {
            return res.status(400).send({ msg: "Enter Body" })
        }
       
        if (!isValid(category)) {
            return res.status(400).send({ msg: "Enter Category" })
        }
       
        if (!isValid(authorId)) {
            return res.status(400).send({ msg: "Enter  Author Id" })
        }
       
        if (!isValidObjectId(authorId)) {
            return res.status(400).send({ msg: "Enter Valid Author Id" })
        }

        let savedData = await blogModel.create(req.body);
        res.status(201).send({ msg: savedData });
    }
    catch (err) {
        res.status(500).send({ msg: "server error", error: err })
    }
};
module.exports.createBlog = createBlog



//====================================================Get Blog Api========================================================================


const getBlogData = async function (req, res) {
    try {
        if(req.query.authorId){
        if(!isValidObjectId(req.query.authorId)) return res.status(400).send({status:false,msg:"enter valid authorId"})}
        
        let  blogs = await blogModel.find({$and:[req.query,{isDeleted:false,isPublished:true}]})
            if (blogs.length > 0) {
                res.status(200).send({ status: true, data:blogs })
            }
            else {
                res.status(404).send({ status: false, msg: "No blog found" })

            }

        
    }
    catch (err) {
        
        res.status(500).send({ msg:err.message})
    }
}
module.exports.getBlogData = getBlogData




//================================================Update Blog Api========================================================================



const updateBlog = async function (req, res) {
    try {
        
        let data = req.body
        let blogId = req.params.blogId

        let blog = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!blog) { return res.status(400).send({ status: false, msg: "blog not found" }) }

        if(Object.keys(data).length<1)return res.status(400).send({status:false,msg:"Enter what you want to update"})
        if (data.tags) {
            data.tags = blog.tags.concat(data.tags)
        }
        if (data.subcategory) {
            data.subcategory = blog.subcategory.concat(data.subcategory)
        }
        if (data.isPublished === true) { data.publishedAt = moment().format() }

        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: data }, { new: true })
        res.status(200).send(updatedBlog)
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }

}

module.exports.updateBlog = updateBlog




//================================================Delete Blog Api From BlogId=================================================================



let deleteBlog = async function (req, res) {
    try {
        let id = req.params.blogId
        if (!id) return res.status(400).send({ sataus: false, msg: "blog id is required" })
        let idvalidation = await blogModel.findById(id)
        if (!idvalidation) return res.status(400).send({ status: false, msg: "invalid blog id" })
        if (idvalidation.isDeleted == true) return res.status(400).send({ status: false, msg: "blog is already deleted" })
        if (idvalidation.isDeleted == false) {
            let validetion = await blogModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true, deletedAt: moment().format() } })
            return res.status(200).send({ status: true, msg: "blog is deleted successfully" })

        }

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

}

module.exports.deleteBlog= deleteBlog



//================================================Delete Blog Api From Query-Params=======================================================




let queryDelete = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data).length < 1) return res.status(400).send({ status: false, msg: "query params is not given" })
       
        let blogs= await blogModel.find({$and:[data,{isDeleted:false}]})
        if (blogs.length<1) return res.status(404).send({ status: false, msg: "blog does not exist" })
       
       let deletedBlogs = await blogModel.updateMany(
        {$and:[data,{isDeleted:false}]},
        {isDeleted:true}
       )
        return res.status(200).send({ status: true, msg: "blog is deleted sucessfully" })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

}


module.exports.queryDelete = queryDelete

