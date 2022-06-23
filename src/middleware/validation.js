const mongoose = require("mongoose")


const isValidName =function(name){
    const  nameRegex =/^[a-zA-Z, ]{2,30}$/
    return nameRegex.test(name)
}
const isValidTitle =function(title){
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}
const isValidEmail = function(email){
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return emailRegex.test(email)
}
const isValidPassword = function(password){
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passRegex.test(password)
}
const  isValidObjectId =function(id){
    var ObjectId = mongoose.Types.ObjectId;
    return ObjectId.isValid(id)
}
const isBoolean = function(value){
    if(value === true || value === false) return true
    return false
    
}
const isValid = function(value){
    if(typeof value ==='undefined' || value ===null)  return false
    if(typeof value ==='string' && value.trim().length ===0)return false
    return true
}

const isValidBlogTitle = function(title){
    const bTitleregex = /^[A-Za-z0-9 ]+$/
    return bTitleregex.test(title)
}

module.exports = { isValidName, isValidTitle, isValidEmail, isValidPassword, isValidObjectId, isBoolean, isValid ,isValidBlogTitle}