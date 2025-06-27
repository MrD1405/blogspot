import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import cors from 'cors';
import User from './Schema/User.js'
let PORT=7777;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
const server=express();
server.use(cors());
server.use(express.json());
mongoose.connect(process.env.DB_LOCATION,{
    autoIndex:true,
})


server.post("/signup",(req,res)=>{
    const {fullName , email,password}=req.body;

    //validating user info
    if(fullName.length<3){
        return res.status(403).json({message:"Full Name must be atleast 3 characters long"});
    }
    if(!email.length){
        return res.status(403).json({ message : "Email is required"});
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({message :"Invalid Email Format"});
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({message:"Password must be 6-20 characters long, contain at least one numeric digit, one uppercase and one lowercase letter"});
    }
    bcrypt.hash(password,10,async (err,hash)=>{
        let userName=email.split("@")[0];
        let user=new User({
            personal_info:{fullName,email,password:hash,username:userName},
        })
        user.save().then((u)=>{
            return res.status(200).json({user:u});
        })
        .catch((err)=>{
            return res.status(500).json({error:"error while saving user"})
        })
    })
    

    return res.status(200).json({
        message:"User signed up successfully",
    });

})


server.listen(PORT,()=>{
    console.log("Server is running on Port "+PORT);
})



