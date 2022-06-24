const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/authorController")
const BlogController=require("../controller/blogController")
const {authenticate,authorization,forCreateBlogAuth,forDeleteByQuery, newAuth, getBlogAuth} = require("../middleware/middleware")

//====================================================APIs================================================================================


//-----------done---------------------------------------------------

router.post("/authors", AuthorController.createAuthor)
router.post("/login",AuthorController.loginAuthor)


router.post("/blogs",forCreateBlogAuth, BlogController.createBlog)
router.get("/blogs",authenticate,getBlogAuth, BlogController.getBlogData)


router.put("/blogs/:blogId",authenticate,authorization, BlogController.updateBlog)
router.delete("/blogs/:blogId",authenticate,authorization, BlogController.deleted)

//------------------------------------------------------------------


router.delete("/blogs",authenticate,forDeleteByQuery, BlogController.queryDelete)


//router.delete("/newblogs",newAuth, BlogController.deleteparams)




module.exports = router;