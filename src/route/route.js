const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/authorController")
const BlogController=require("../controller/blogController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors", AuthorController.createAuthor  )
router.post("/blogs", BlogController.createBlog)
router.get("/blogs", BlogController.getBlogData)
router.put("/blogs/:blogId", BlogController.updateBlog)
router.delete("/blogs/:blogId", BlogController.deleted)
router.delete("/blogs", BlogController.queryDelete)


module.exports = router;