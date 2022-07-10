const express = require('express');
const router = express.Router();

const credential={
    email:"ug@gmail.com",
    password:"12345"
}



router.post("/login",(req, res) =>{

        let email = req.body.email;
        let password = req.body.password;

        if (email==credential.email&&password==credential.password){
            res.send("Login Success")
        }
        else{
            res.send("Invalid")
        }
        
})
module.exports =router;