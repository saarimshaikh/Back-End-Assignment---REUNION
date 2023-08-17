const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const Post = require("../model/Post");
const {ObjectId} = require("mongodb");

//@api      POST /api/like/:id
//@desc     Like post
//@access   Private
router.post("/:id",Auth,async(req,res)=>{
    try {
        const currUserId = req.user.id;
        console.log(req.params.id);
        const post = await Post.findOne({_id: req.params.id});
        if(!post){return res.send("No Post Found with provided id :"+req.params.id)}
        else{
            
        //    if(post.likes.filter((like)=>like.user.id.toString() === currUserId).length>0){
        //     return res.send("Already Liked this post");
        //    }
        //    else{
        //     let curr = new ObjectId(currUserId);
        //     post.likes.unshift({user:curr});
        //     await post.save();
        //     return res.send(post);
        //    }
        post.likes.forEach((like)=>{
            let curr = new ObjectId(currUserId);
            if(like.user.toString() === req.user.id){
                return res.send("you already liked the post")
            }

        })
        // let curr = new ObjectId(currUserId);
        post.likes.unshift({user:currUserId});
        await post.save();
        return res.send(post);
        }
    } catch (error) {
     return res.send(error.message);   
    }
})


module.exports = router;