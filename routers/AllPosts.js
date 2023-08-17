const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const Auth = require("../middlewares/Auth");

//@api      GET /api/all_posts
//@desc     Get all Post
//@access   Private
router.get("/",Auth,async(req,res)=>{
    try {
        const posts = await Post.find();
        const postArr = [];
        posts.map(post=>{
            let postObj = {};
            postObj.id = post._id;
            postObj.Title = post.Title;
            postObj.Description = post.Description;
            postObj.created_at = post.created_at;
            postObj.comments = post.comments;
            postObj.likes = post.likes.length;
            postArr.push(postObj);
        })
        return res.send(postArr);
        // const Title = post.Title;
        // const Description = post.Description;
        // const created_at = post.created_at;
        // const comments = post.comments;
        // const likes = post.likes.length;
        // const id = post._id;
        // const postObj = {_id,Title,Description,created_at, comments,likes};
        // return res.send(posts);
        // return res.json({posts});
    } catch (error) {
        return res.status(500).send("Error Ocurred : "+error.message);
        
    }
})

module.exports = router;