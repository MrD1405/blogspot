import express from 'express';
import cors from 'cors';
let PORT=7777;
const server=express();
server.use(cors());
server.listen(PORT,()=>{
    console.log("Server is running on Port"+PORT);
})