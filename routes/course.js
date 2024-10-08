const express = require ("express");

const courseRouter = express.Router();



courseRouter.post("/purchase",(req,res)=>{
    res.json({
        message:"course/purchases"
    })
})

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message:"all courses"
    })
  })

  module.exports = {
    courseRouter:courseRouter
  }