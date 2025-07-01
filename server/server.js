import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import cors from 'cors';
import User from './Schema/User.js'
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

let PORT=7777;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
const server=express();
server.use(cors());
server.use(express.json());
mongoose.connect(process.env.DB_LOCATION,{
    autoIndex:true,
})


const formatDataToSendUser=(user)=>{
    const accessToken=jwt.sign({id:user._id},process.env.SECRET_ACCESS_KEY);
    return{
        accessToken:accessToken,
        username:user.personal_info.username,
        profile_img:user.personal_info.profile_img,
        fullname:user.personal_info.fullname
    }
}


//properly implement this function
//issue with nanoid and recursively generating username
const generateUserName=async (email)=>{
    let userName=email.split("@")[0];
    let isUserNameNotUnique=await User.exists({"personal_info.username":userName}).then((result)=>result);
    isUserNameNotUnique?userName+=nanoid() :"";
    return userName;
}

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
        let userName=await generateUserName(email);
        let user=new User({
            personal_info:{fullname:fullName,email,password:hash,username:userName},
        })
        user.save().then((u)=>{
            res.status(200).json(
            formatDataToSendUser(u)
            );
        })
        .catch((err)=>{
            if(err.code===11000){
                return res.status(403).json({error:"User with this email already exists"});
            }
            return res.status(500).json({error:"error while saving user -> "+err.message})
        })
    })
})

server.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email.length){
        return res.status(403).json({ message : "Email is required"});
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({message :"Invalid Email Format"});
    }
    if(!password.length){
        return res.status(403).json({message:"Password is required"});
    }
    User.findOne({"personal_info.email":email}).then((user)=>{
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        bcrypt.compare(password,user.personal_info.password,(err,result)=>{
            if(err){
                return res.status(500).json({Error:"error while comparing password -> "+err.message});
            }
            if(!result){
                return res.status(403).json({error:"Invalid Password"});

            }
            return res.status(200).json(formatDataToSendUser(user));
        })
        
    }).catch((err)=>{
        return res.status(500).json({error:"Error while finding user -> "+err.message});
    })  
})

server.listen(PORT,()=>{
    console.log("Server is running on Port "+PORT);
})



