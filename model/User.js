const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    Email:{type:String},
    Password:{type:String},
    id:{type:mongoose.Schema.Types.ObjectId},
    followers:[
        {
            user:{type:mongoose.Types.ObjectId}
        }
    ],
    following:[
      {
        user:{type:mongoose.Types.ObjectId}
        }
    ]
});

module.exports = User = mongoose.model("User",UserSchema);