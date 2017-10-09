const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const UserModel = require("./User.js");
const mongoose = require('mongoose');
const async = require("async");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log("Connection error");
    process.exit();
});

const unameA = ["Rungta", "Lokii","Tapan","Rishav", "Ashish"]
const users = [];
for (var i=0 ; i<5; i++){
    var user = new UserModel({
        uname:unameA[i],
        password:"pass",
        email:"lokesh.slg06@gmail.com",
        profileDetails: {
            name: "Abhishek Rungta",
            gender: "Male",
            number:"7908052704",
            cname:"Fountane",
            approvalStatus:false,
            panNo:"XXXXX",
            sTax:"XXXX",
            alt:"8754513405"
        },
        idProof:{
            option:"any",
            proofNo:"XXXX"
        },
        officeAdr:{
            line1:"Flat no 3061, Estancia Tower 3 , Estancia Township",
            line2:"Vallancherry, Guduvanchery",
            state:"Tamil Nadu",
            city:"Chennai",
            pin:"6030203"
        },
        addrDetails:{
            type:"Home",
            proofNo:"XXXXX"
        },
        personalDetails:{
            line1:"Flat no 3061, Estancia Tower 3 , Estancia Township",
            line2:"Vallancherry, Guduvanchery",
            state:"Tamil Nadu",
            city:"Chennai",
            pin:"6030203"
        },
        balance:"Rs.3455666.23"
    });

    users.push(user);
}

async.each(
    (user,callback) => {
        user.save(() => {
            callback();
        })
        console.log("Seed");    
    },
    (err) => {


        console.log("Finished seeding");
    } 
)