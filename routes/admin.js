const express = require("express");

const adminRouter = express.Router();
const { adminModel } = require("../db");  // Assuming this will be used later


function adminMiddleware(req, res, next) {
    console.log("Admin Middleware triggered");
    next();
}


adminRouter.use(adminMiddleware);

// Routes
adminRouter.post("/signup", (req, res) => {
    res.json({
        message: "admin signup"
    });
});

adminRouter.post("/signin", (req, res) => {
    res.json({
        message: "admin signin"
    });
});

adminRouter.post("/course", (req, res) => {
    res.json({
        message: "admin course endpoint"
    });
});

adminRouter.put("/course", (req, res) => {
    res.json({
        message: "admin wants to change course"
    });
});

adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        message: "bulk courses"
    });
});

module.exports = {
    adminRouter:adminRouter
}
