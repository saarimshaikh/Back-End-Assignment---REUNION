const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const User = require("../model/User");
const checkAuthToken = require("../middlewares/CheckToken");
const jwt = require("jsonwebtoken");
//@route    POST /api/follow/:id
//@desc     follow user with id
//@access   private
router.post("/:id", Auth, checkAuthToken, async (req, res) => {
  try {
    if (req.token) {
      const decode_token = jwt.decode(req.token, (verify = false));
      const loggedInMail = decode_token.user.email;
      const currentUser = await User.findOne({ Email: loggedInMail });
      const targetUser = await User.findOne({ _id: req.params.id });
      const targetUserId = req.params.id;
    const currentUserId = req.user.id;
      

    currentUser.following.unshift({user : req.params.id});
    targetUser.followers.unshift({user : req.user.id});
    await currentUser.save();
    await targetUser.save();
    return res.send(currentUser);
    
    // return res.send({targetUserId, currentUserId});
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
