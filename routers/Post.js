const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const Post = require("../model/Post");
//@api      GET /api/post/
//@desc     Test api
//@access   Public

router.get("/",(req,res)=>{
    console.log("You can now explore post api");
    res.send("You can now explore post api")
})

//@api      POST /
//@desc     Add Post
//@access   Private
router.post("/",Auth,async(req,res)=>{
    const {Title,Description} = req.body;
    const date = new Date();
    const currDate = new Date().getDate();
    const currHours = new Date().getHours();
    const currMin = new Date().getMinutes();
    const currSeconds  = new Date().getSeconds();
    const day = new Date().getDay();
    const currMonth = date.getMonth();
    const currYear = date.getFullYear();
    const created_at = day+"/"+currMonth+"/"+currYear+"-"+currHours+":"+currMin+":"+currSeconds;
    // const id = uuidv4();

    const newPost = new Post({Title,Description,created_at});
    await newPost.save();
    return res.send(newPost);
})



//@api      GET /:id
//@desc     Get Post by id
//@access   Private
router.get("/:id",Auth,async(req,res)=>{
    try {
        const post = await Post.findOne({_id:req.params.id});
        if(!post){return res.send("Post not found with provided id : "+req.params.id)}
        else{
            const Title = post.Title;
            const Description = post.Description;
            const likesCount = post.likes.length;
            const commentCount = post.comments.length;
            const id = post._id;
            const createdAt = post.created_at;
            const postObj = {Title,Description,likes:likesCount,comments:commentCount,createdAt,id};
            return res.send(postObj);
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred : "+error.message);
    }
})


//@route    DELETE /api/posts/:id
//@desc     Delete post by id
//@access   Private
router.delete("/:id",Auth,async(req,res)=>{
        
    try {
        const post = await Post.findOne({_id : req.params.id});
        if(!post){return res.status(404).send('no post found')}
        else{
            const removedPost = await Post.findOneAndDelete({_id:req.params.id});
            return res.status(200).send(removedPost);
        }
    } catch (error) {
        return res.send('Error Occurred : '+error.message);   
    }


})


module.exports = router;