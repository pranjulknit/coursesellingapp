const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const {adminRouter} = require("./routes/admin");

require("dotenv").config();


const port = process.env.PORT || 3005;

const app = express();


app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

 

  app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
  });


