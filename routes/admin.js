const express = require("express");

const {z} = require("zod");
const {hashedPassword,verifyPassword} = require("../utils/hashing");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminRouter = express.Router();
const { adminModel, courseModel } = require("../db");  // Assuming this will be used laterno
const course = require("./course");
const admin = require("../middleware/admin");

const JWT_PASSWORD = process.env.ADMIN_PASSWORD;
function adminMiddleware(req, res, next) {
    console.log("Admin Middleware triggered");
    next();
}


adminRouter.use(adminMiddleware);

// Routes
adminRouter.post("/signup",async (req, res) => {
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
    
          await adminModel.create({
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
  
});

adminRouter.post("/signin", async(req, res) => {
    const {email,password} = req.body;

    

    const admin = await adminModel.find({
      email:email,
      password:password
    })

    if(admin){

      // comparing password and hashedpassword;



      try{
        const match = await verifyPassword(admin.password,password);
        const token = jwt.sign({
          id:admin._id
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
});

adminRouter.post("/course",adminMiddleware, async(req, res) => {
    const adminId = req.userId;
    const {title,description,imageUrl,price} = req.body;

    const course = await courseModel.create({
        title,description,imageUrl,price,creatorId:adminId
    })
    res.json({
        message: "Course Created",
        courseId: course._id
    });
});

adminRouter.put("/course",adminMiddleware, async(req, res) => {
    const adminId = req.userId;
    const {title,description,imageUrl,price,courseId} = req.body;

    const course = await courseModel.updateOne({_id:courseId,creatorId:adminId},{
        title,description,imageUrl,price,creatorId:adminId
    })
    res.json({
        message: "Course Updated",
        courseId: course._id
    });
});

adminRouter.get("/course/bulk", async(req, res) => {
    const adminId = req.userId;

    const courses  = await courseModel.find({
        creatorId:adminId
    })

    res.json({
        message: "bulk courses"
    });
});

module.exports = {
    adminRouter:adminRouter
}
