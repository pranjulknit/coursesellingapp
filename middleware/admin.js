const jwt = require("jsonwebtoken");
require("dotenv").config();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function adminMiddileware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,ADMIN_PASSWORD);

    if(decoded){
        req.adminId = decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}

module.exports = {
    adminMiddileware:adminMiddileware
}