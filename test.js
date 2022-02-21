const express=require("express");
const User = require("../model/userschema");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const router=express.Router();

let testvaer = "incoming change"

router.post("/",async function(req,res){
    try{
        const{id,password}=req.body;
    const user=await User.findOne({id});
    console.log("user",user)
    if(!user){
        res.json({
            status:"failed",
            message:"user not registred",
            data:"error"
        })
    }
    if(password!==user.password){
            return res.json({
                status:"failed",
                message:"password incorrect",
                data:'error'
            });
        }
    const token=jwt.sign({
        data: user._id,
    }, 'secret');
    res.json({
        status:"success",
        data:token
    })

    }
    catch(e){
        return res.json({
            status:"failed",
            message:"internal error - please look into it"
        })

    }
    
});
module.exports=router;