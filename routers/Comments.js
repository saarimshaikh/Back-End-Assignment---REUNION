const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const Auth = require("../middlewares/Auth");

//@api      GET /:id
//desc      Test Route
//@access   Private
router.get("/",(req,res)=>{
    res.send("You can now work on comments api")
});


//@api      POST /:id
//desc      Post a comment for the id provided
//@access   Private
router.post("/:id",Auth,async(req,res)=>{
    // res.send(req.params.id);
    const isPostExisted = await Post.findOne({id:req.params.id});
    if(!isPostExisted){
        return res.send("No Post Found with provided id");
    }
    else{
        
        const {Comment} = req.body;
        if(!Comment){return res.send("Please Add All Details")}
        // const author = req.user;
        isPostExisted.comments.unshift({Comment});
        await isPostExisted.save();
        return res.send(isPostExisted);

        // res.send(isPostExisted);
    }
})

module.exports = router;