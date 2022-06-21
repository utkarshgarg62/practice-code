const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/authorController")
const BlogController=require("../controller/blogController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/author", AuthorController.createAuthor  )
router.post("/createBlog", BlogController.createBlog)

module.exports = router;