const express = require('express');
const router = express.Router();
const loginController=require("../controller/loginController")
const signController=require("../controller/signController")



router.post("/login",loginController.loginUser)
router.post("/sign",signController.signUser)




module.exports =router;