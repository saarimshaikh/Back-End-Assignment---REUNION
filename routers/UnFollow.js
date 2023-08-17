const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const User = require("../model/User");
const checkAuthToken = require("../middlewares/CheckToken");

//@route    POST /api/unfollow/:id
//@desc     Unfollow user
//@access   Private
router.post("/:id",Auth,checkAuthToken,async(req,res)=>{

    try {
        const currUserId = req.user.id;
        const targetUserId = req.params.id;

        const targetUser = await User.findOne({_id : targetUserId});
        if(targetUser.followers.filter((follower)=>follower.toString() === currUserId).length==0){
            return res.send("You are not following this user yet");
        }
        else{
            const removeIndex = targetUser.followers.map(follower.user.toString()).indexOf(currUserId);
            targetUser.followers.splice(removeIndex,1);
            return res.send(currUserId);
        }

    } catch (error) {
        return res.status(500).send("Error Occurred : "+error.message);
    }
})

module.exports = router;