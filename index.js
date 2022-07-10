const express= require('express')
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const Router=require("./routes/route")
const app=express()



app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set("view engine","ejs");

//****** home route *****//
app.get("/",(req,res)=>{
    res.render("base",{title:"Login System"});
})

app.use('/route', Router)  

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


mongoose.connect("mongodb+srv://functionup-radon-cohort:radon123@cluster0.zbsotuc.mongodb.net/login_front_back?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

