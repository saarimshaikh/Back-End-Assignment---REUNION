const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const {v4:uuidv4} = require("uuid");
const PostSchema = new mongoose.Schema({
    
    Title:{
        type:String
    },
    Description:{type:String},
    created_at:{type:String},
    comments:[
       {
        Comment:{type:String}
        
       }
    ],
    likes:[
       {
            user:{type:mongoose.Types.ObjectId}
       }
    ]
});

module.exports = Post = mongoose.model("post",PostSchema);