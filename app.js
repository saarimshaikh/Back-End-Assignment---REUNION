const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

const conn = require("./connection/connection.js");
const auth = require("./routers/Auth");
const post = require("./routers/Post");
const comment = require("./routers/Comments");
const allPosts = require("./routers/AllPosts");
const likePost = require("./routers/Like");
const unlikePost = require("./routers/UnlikePost");
const User = require("./routers/User");
const Follow = require("./routers/Follow");
const UnFollow = require("./routers/UnFollow");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/authenticate",auth);
app.use("/api/posts/",post);
app.use("/api/comment",comment);
app.use("/api/all_posts",allPosts);
app.use("/api/like",likePost);
app.use("/api/unlike",unlikePost);
app.use("/api/user",User);
app.use("/api/follow",Follow);
app.use("/api/unfollow",UnFollow);

const port = 4500;
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.listen(port, ()=>{console.log("Listening on port : ",port)});