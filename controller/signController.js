const userModel=require("../model/userModel")


const signUser =  async function (req, res) {

    let data=req.body;
    let userData= await userModel .create(data)
    res.send("Sign Succesfully")
}

module.exports.signUser=signUser