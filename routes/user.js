const express = require("express");

const userRouter = express.Router();


userRouter.post("/signup",(req,res)=>{
    res.json({
      message: " signup endpoint"
    })
  })
  
  
  userRouter.post("/signin",(req,res)=>{
      res.json({
        message: " signin endpoint"
      })
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