const authorModel = require("../models/authorModel");
const jwt = require('jsonwebtoken')
const { isValidName, isValidTitle, isValidEmail, isValidPassword, isValid } = require("../middleware/validation")



//====================================================Create Author Api====================================================================



const createAuthor = async function (req, res) {
    try {
        let {fname,lname,title,email,password} = req.body;
        
        if (Object.keys(req.body).length<1) return res.status(400).send({ msg: "Insert Data : BAD REQUEST" })

        if (!isValid(fname)) {
            return res.status(400).send({ msg: "Enter First Name" })
        }
        if (!isValidName(fname)) {
            return res.status(400).send({ msg: "fname only take alphabets" })
        }
        if (!isValid(lname)) {
            return res.status(400).send({ msg: "Enter Last Name" })
        }
        if (!isValidName(lname)) {
            return res.status(400).send({ msg: "lname only take alphabets" })
        }
        if (!isValid(title)) {
            return res.status(400).send({ msg: "Create Title Name" })
        }
        if (!isValidTitle(title)) {
            return res.status(400).send({ msg: "Enter title from this ['Mr', 'Mrs', 'Miss']" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ msg: "Enter Email-Id" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ msg: "enter valid email" })
        }
        let checkEmail=await authorModel .findOne({email:email})
        if(checkEmail) return res.status(400).send({msg :"Email Already Registered"})
        
        if (!isValid(password)) {
            return res.status(400).send({ msg: "Create Password" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ msg: "Minimum eight characters, at least one letter and one number" })
        }
        let savedData = await authorModel.create(req.body);
        return res.status(201).send({ data: savedData });
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }

};


//====================================================Author Login Api=======================================================================


const loginAuthor = async function (req, res) {

    try {
        if (Object.keys(req.body).length<1) return res.status(400).send({ msg: "Insert Data : BAD REQUEST" })
        
        let email = req.body.email;
        if(!email) return res.status(400).send({status:false,msg:"enter email"})

        let password = req.body.password;
        if(!password) return res.status(400).send({status:false,msg:"enter password"})

        let author = await authorModel.findOne({ $and:[{email: email}, {password: password }]});
        if (!author)
            return res.status(400).send({
                status: false,
                msg: "email or the password is not correct",
            });
        let token = jwt.sign(
            {
                authorId: author._id.toString(),
            },
            "group-25"
        );
        return res.status(200).send({ status: true, token: token });
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }


}



module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor
