const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({path:"../config.env"});
const jwt = require("jsonwebtoken");
const {v4:uuidv4} = require("uuid");
const mongoose = require("mongoose");
// api/authenticate     GET 
//@desc         Authenticate User
//@access       Public

router.get("/",(req,res)=>{
    
    res.send("You can now login ")
})


//@api      POST /
//@desc     Take credentials
//@access   Public
router.post("/",async(req,res)=>{
    const {Email,Password} = req.body;
    if(!Email || !Password){
        return res.send("Please Fill All The Details");
    }else{
        // let Id = uuidv4();
        let unique_id = new mongoose.Types.ObjectId();
        console.log("Id:",unique_id)
        const payload = {
            user:{
                id:unique_id,
                email:Email,
                password:Password
            },
            

            
        };
        jwt.sign(payload,process.env.JWT_Secret,{expiresIn:36000},(err,token)=>{
            if(err) throw err;
            else{
                return res.json({token,unique_id});
            }
        })
    }
});
module.exports = router;