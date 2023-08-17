const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/Auth");
const User = require('../model/User');
const jwt = require("jsonwebtoken");
const checkAuthToken = require("../middlewares/CheckToken");
//@route    GET /api/user
//@desc     Return user with his details
//@access   Private
router.get("/",checkAuthToken,Auth,async(req,res)=>{
    try {
       const currToken = req.token;
       if(currToken){
        const decode_token = jwt.decode(currToken,verify=false);
        const Email = decode_token.user.email;
        const password = decode_token.user.password;
        const user = await User.findOne({Email});
        if(!user){return res.send("No user found")}
        else{
            return res.send(user);
        }
       }
    } catch (error) {
        return res.send("Error Occurred : "+error.message);
    }

})


module.exports = router;