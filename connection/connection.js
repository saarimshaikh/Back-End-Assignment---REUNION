const mongoose = require("mongoose");

const conn = mongoose.connect(process.env.DB_URL,{useNewUrlParser:true}).then((suc)=>{
    console.log("Connected to db")

})
.catch((err)=>{console.log("Error while connecting to db")})