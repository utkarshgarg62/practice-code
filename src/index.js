const express= require('express')
const bodyparser=require('body-parser')
const route=require('./route/route')
const mongoose=require('mongoose')
const cookies= require('cookie-parser')
const path=require("path");


const app=express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookies()) // for login token

const staticPath =path.join(__dirname,"../public")
app.use(express.static(staticPath))

//to set view engine
app.set("view engine","hbs")


//template engine route
app.get("/",(req,res)=>{
    res.render('index',{title:"Home Page"})
})

app.get("/register",(req,res)=>{
    res.render('register_author',{title:"Author Registration"})
})

app.get("/login",(req,res)=>{
    res.render('login_author',{title:"Author Login"})
})

app.get("/dashboard",(req,res)=>{
    res.render('dashboard',{title:"Dashboard"})
})

app.get("/create",(req,res)=>{
    res.render('create_blog',{title:"Create"})
})

app.get("/update",(req,res)=>{
    res.render('update_blog',{title:"Update"})
})

app.get("/delete",(req,res)=>{
    res.render('delete_blog',{title:"Delete"})
})

app.get("/get",(req,res)=>{
    res.render('get_blog',{title:"Get"})
})


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