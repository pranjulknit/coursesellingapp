const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_PASSWORD = process.env.JWT_PASSWORD;

function userMiddileware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_PASSWORD);

    if(decoded){
        req.userId = decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}

module.exports = {
    userMiddileware:userMiddileware
}