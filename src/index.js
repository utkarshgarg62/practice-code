const express= require('express')
const bodyparser=require('body-parser')
const route=require('./route/route')
const mongoose=require('mongoose')
const path=require("path");
const cookies= require('cookie-parser')

const app=express()
app.use(cookies())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path))

//===================================================Data-Base Connection=================================================================


mongoose.connect("mongodb+srv://functionup-radon-cohort:radon123@cluster0.zbsotuc.mongodb.net/projectBlog?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


//========================================================================================================================================


app.use('/', route)  


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});