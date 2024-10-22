const { mongoose} = require("mongoose");
require('dotenv').config();


const Schema = mongoose.Schema;
const objectId = new mongoose.Types.ObjectId();




const userSchema = new Schema({
    email: {
        type: String, // Correct the type
        unique: true,
    },
    password: String,
    firstName: String,
    lastName: String,
});

const adminSchema = new Schema({
    email: {
        type: String, // Correct the type
        unique: true,
    },
    password: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {
        type: mongoose.Types.ObjectId, // Should reference ObjectId correctly
        required: true
    }
});

const purchaseSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId, // Should reference ObjectId correctly
        required: true
    },
    courseId: {
        type: mongoose.Types.ObjectId, // Should reference ObjectId correctly
        required: true
    }
});

// Fix mongoose.model() method usage
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};