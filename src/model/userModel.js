const mongoose = require("mongoose")

var userModel = new mongoose.Schema(
    {

    // FIELDS AND ATTRIBUTE HERE

    },{ timestamps: true }
    
)

module.exports = mongoose.model("userCollection", userModel)