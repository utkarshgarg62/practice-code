const express= require('express')
const bodyparser=require("body-parser")
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

