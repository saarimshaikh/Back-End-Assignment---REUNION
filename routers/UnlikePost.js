const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const Post = require("../model/Post");
//@api      POST /api/unlike/:id
//@desc     Unlike the post by auth user
//@access   Private

router.post("/:id",Auth,async (req,res)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findOne({_id:postId});
        if(!post){return res.send("No Post Found with provided id : "+postId)}
        else{

            //check the likes array and remove the auth user from it
           if(post.likes.filter(like=>like.user.toString() === req.user.id).length===0){
            // post.likes.user.remove();
            return res.send("Post not yet liked");
           }
           const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
           post.likes.splice(removeIndex,1);
           await post.save();
           return res.send(post);

        }
    } catch (error) {
        return res.status(500).send("Error Ocurred : "+error.message)
    }

})

module.exports = router;