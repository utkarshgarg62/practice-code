const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/authorController")
const BlogController=require("../controller/blogController")
const {authenticate,forDeleteByQuery, newAuth } = require("../middleware/middleware")

//====================================================APIs================================================================================


router.post("/authors", AuthorController.createAuthor)
router.post("/login",AuthorController.loginAuthor)


router.post("/blogs",authenticate, BlogController.createBlog)
router.get("/blogs",authenticate,BlogController.getBlogData)


router.put("/blogs/:blogId",authenticate,newAuth, BlogController.updateBlog)
router.delete("/blogs/:blogId",authenticate,newAuth, BlogController.deleteBlog)
router.delete("/blogs",authenticate,forDeleteByQuery, BlogController.queryDelete)





module.exports = router;