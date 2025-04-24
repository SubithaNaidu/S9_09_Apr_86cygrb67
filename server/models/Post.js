const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique:true  
    },
    content:{
        type: String,
        required: true
    },
   author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
   },
   category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category',
   },
   status:{
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
   },
   tags:{
    type: [String],
    default: []
   }
},{
    timestamps: true
})

const Post = mongoose.model("Post",postSchema)

module.exports = Post