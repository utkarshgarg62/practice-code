const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: objectId,
        ref: "authorModel",
        required: true
    },
    tags: [String],

    category: {
        type: String,
        required: true
    },
    subcategory: [{
        type: String,
        //required: true
    }],
    deletedAt: {
        type: String,
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
    publishedAt: {
        type: String,
    },
    isPublished: { 
        type: Boolean, 
        default: false 
    }

}, { timestamps: true });

module.exports = mongoose.model('blogModel', blogSchema)