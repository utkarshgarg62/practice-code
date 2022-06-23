const isValidName =function(name){
    const  nameRegex =/^[a-zA-Z, ]{2,30}$/
    return nameRegex.test(name)
}