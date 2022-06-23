const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/authorController")
const BlogController=require("../controller/blogController")
const {authenticate,authorization} = require("../middleware/middleware")

//====================================================APIs================================================================================

router.post("/authors", AuthorController.createAuthor  )
router.post("/blogs", BlogController.createBlog)
router.post("/login",AuthorController.loginAuthor)
router.get("/blogs",authenticate, BlogController.getBlogData)
router.put("/blogs/:blogId",authenticate,authorization, BlogController.updateBlog)
router.delete("/blogs/:blogId",authenticate,authorization, BlogController.deleted)
router.delete("/blogs",authenticate,authorization, BlogController.queryDelete)


module.exports = router;