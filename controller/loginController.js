const userModel=require("../model/userModel")


const loginUser = async function (req, res) {


    let email = req.body.email;
    let password = req.body.password;
    let checkData=await userModel .findOne({email:email,password:password})
    if (!checkData){
        res.send("Invalid")
    }
    else{
        res.send("Login Success")
        // return res.redirect("");
    }
    
}


module.exports.loginUser=loginUser