const express = require("express");
const { userModel } = require("../db");
const {z} = require("zod");
const {hashedPassword,verifyPassword} = require("../utils/hashing");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();
require("dotenv").config();


const JWT_PASSWORD = process.env.JWT_PASSWORD;


userRouter.post("/signup",async (req,res)=>{

  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  // zod validation 

  const validationSchema = z.object({
      email:z.string().email(),
      password:z.string().min(5).max(10),
      firstName:z.string().max(10,{message:"Name should not be more than 10 chars"}),
      lastName:z.string().max(10)
  })
  const validated = validationSchema.safeParse({email,password,firstName,lastName});

  // hash password

  if(validated.success){
       const passwordHash = await hashedPassword(password);

       try{
  
        await userModel.create({
          email,
          passwordHash,
          firstName,
          lastName
        })
  
        res.json({
          message: " signup succeed"
        })
  
    }catch(e){
          res.json({
            message: `signup has failed ${e}`
          })
    }

  }else{
    res.json({
      message:"validation of object failed"
    })
  }

  
    
  })
  
  
  userRouter.post("/signin",async (req,res)=>{
    const {email,password} = req.body;

    

    const user = await userModel.find({
      email:email,
      password:password
    })

    if(user){

      // comparing password and hashedpassword;



      try{
        const match = await verifyPassword(user.password,password);
        const token = jwt.sign({
          id:user._id
        },JWT_PASSWORD);
  
        // cookie logic
  
        res.json({
          token:token
        })

      }
      catch(e){
        res.json({
          message:"password not matched"
        })
      }

      

      
    }
    else
      {
          res.json({
          message: "signin Failed"
        })
    }
    })
  
   
  
    userRouter.post("/purchases",(req,res)=>{
  
        // when user wants to purchase a course

        res.json({
            message: " when user wants to purchase a course"
          })
  
    })
  
    userRouter.get("/purchase",(req,res)=>{
  
      // when users wants to see their purchase

      res.json({
        message: " when users wants to see their purchase"
      })
  
    })

    module.exports ={
        userRouter:userRouter
    }