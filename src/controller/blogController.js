const mongoose = require("mongoose");
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")
const moment = require('moment');
const { isValid, isValidBlogTitle, isValidObjectId } = require("../middleware/validation");

//====================================================Create Blog Api========================================================================


const createBlog = async function (req, res) {
    try {
        let {title,body,tags,category,subcategory,authorId} = req.body;
        
        if (!req.body) {
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


        let author = await authorModel.findById(req.body.authorId)
        if (!author) {
            return res.status(400).send({ status: false, msg: "Author  is not found" })
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
        let allBlogs = await blogModel.find({ isDeleted: true,isPublished:true })
        if (allBlogs.length > 0) {
            let authorId = req.query.authorId
            if (authorId) {
                let author = await blogModel.findOne({ authorId: req.query.authorId })
                if (!author) {
                    return res.status(400).send({ status: false, msg: "Author id is not vaild" })
                }
            }
            req.query.isDeleted = false
            req.query.isPublished=true
            let updatedData = await blogModel.find(req.query)
            if (updatedData.length > 0) {
                res.status(200).send({ status: true, data: updatedData })
            }
            else {
                res.status(404).send({ status: false, msg: "No blog found" })

            }

        }
    }
    catch (err) {
        console.log("This is the error", err)
        res.status(500).send({ msg: "server error", error: err })
    }
}
module.exports.getBlogData = getBlogData




//================================================Update Blog Api========================================================================



const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let blog = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!blog) { return res.status(400).send({ status: false, msg: "blog not found" }) }
        let data = req.body
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



let deleted = async function (req, res) {
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

module.exports.deleted = deleted



//================================================Delete Blog Api From Query-Params=======================================================



let queryDelete = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data).length < 1) return res.status(400).send({ status: false, msg: "query params is not given" })
        let blogvalidation = await blogModel.find(data)
        if (!blogvalidation) returnres.req(404).send({ status: false, msg: "blog does not exist" })
        if (blogvalidation.isDeleted == true) return res.status(400).send({ status: false, msg: "blog is all ready deleted" })
        for (let i = 0; i < blogvalidation.length; i++) {
            if (blogvalidation[i].isDeleted == false) {
                let deletion = await blogModel.updateMany(data, { $set: { isDeleted: true, deletedAt: moment().format() } })
            }
        }
        return res.status(200).send({ status: true, msg: "blog is deleted sucessfully" })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

}

module.exports.queryDelete = queryDelete
