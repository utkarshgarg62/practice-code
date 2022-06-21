const express = require('express');
const router = express.Router();


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//router.post("/createUser", userController.createUser  )
module.exports = router;