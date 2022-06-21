const { model } = require("mongoose");
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


// const getBlogData = async function (req, res) {

//     try {
//         let allBlogs = await blogModel.find({ isDeleted: false })
//         if (allBlogs.length > 0) {

// //////////////error
//             let reqAuthorId=req.query.authorId
//             let reqCategory=req.query.category
//             let reqTags=req.query.tags
            
            
//             let updatedData= await blogModel.find( { 
//             $and: [ {authorId : reqAuthorId } ,{category: reqCategory},{tags:reqTags}]
//             })


// /////////////error

//             res.status(200).send({ status: true, data: updatedData })
//         }
//         else {
//             return res.status(404).send({ status: false, msg: "No blog found" })
//         }
//     }

//     catch (err) {
//         console.log("This is the error", err)
//         res.status(500).send({ msg: "server error", error: err })
//     }
// }
// module.exports.getBlogData = getBlogData





const getBlogData = async function (req, res) {

    try {
        let allBlogs = await blogModel.find({ isDeleted: false })
        if (allBlogs.length > 0) {

//////////////error
            let reqAuthorId=req.query.authorId
            let reqCategory=req.query.category
            let reqTags=req.query.tags
            
            
            let updatedData= await blogModel.find( { 
            $and: [ {authorId : reqAuthorId } ,{category: reqCategory},{tags:reqTags}]
            })


/////////////error

            res.status(200).send({ status: true, data: updatedData })
        }
        else {
            return res.status(404).send({ status: false, msg: "No blog found" })
        }
    }

    catch (err) {
        console.log("This is the error", err)
        res.status(500).send({ msg: "server error", error: err })
    }
}
module.exports.getBlogData = getBlogData
