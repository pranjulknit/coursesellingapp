const bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds =  parseInt(process.env.saltRounds,10);
async function hashedPassword(password) {
    try{
        const hash = await bcrypt.hash(password,saltRounds);
        console.log("Password hashed successfully:- ",hash);
        return hash;
    }
    catch(e){
        console.log(`error in hashing password ${e}`);
    }
}

async function verifyPassword(plainPassword,hash){
    try{
        const match = await bcrypt.compare(plainPassword,hash);
        console.log("password match:- ",match);
         match.success = 1;
         return match;
    }
    catch(e){
        match.success = 0;
        
        console.log("error in password matching:- ",e);

        return match
    }
}

module.exports = {
    hashedPassword:hashedPassword,
    verifyPassword:verifyPassword
}