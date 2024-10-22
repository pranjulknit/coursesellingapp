const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const {adminRouter} = require("./routes/admin");

require("dotenv").config();


const port = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

 


async function main(){

  const db_url = process.env.MONGO_URI;
    try{
        // first connect the database
         await mongoose.connect(db_url)
        console.log("database successfully connected");

        // then server should run
        app.listen(port,()=>{
          console.log(`Server is running at port ${port}`);
        });
      
    }
    catch(e){
      console.log("error occured "+ e);
    };
    


  

}

main()
  


