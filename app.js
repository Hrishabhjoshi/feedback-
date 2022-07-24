const express = require("express");
const mongoose = require("mongoose");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const MongoURI = "mongodb+srv://Hrishabh:Hrishabh%40123@cluster0.pa8nz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MongoURI, { useNewUrlParser: true })
    .then(() => console.log("mongodb connected ...."))
    .catch(err => {
        console.log("mongo not connected");
        console.log(err)});



        const UserSchema  = new mongoose.Schema({
            name : {
                type : String ,
                required : true,   
            },
            email : {
                type : String ,
                required : true,   
            },
            password : {
                type : String ,
                required : true,   
            },
            password2 : {
                type : String ,
                required : true,   
            },
          
        });
        
        const USER = mongoose.model('USER', UserSchema);

        const FeedbackSchema  = new mongoose.Schema({
            name : {
                type : String ,
                required : true,   
            },
            feedback : {
                type : String ,
                required : true,   
            },
          
        });
        
        const FEEDBACK = mongoose.model('FEEDBACK', FeedbackSchema);

        // const new_user = new USER ({
        //    name :  "Ankit" , 
        //    email : "ankit@123" ,
        //    password :  "ansdks" ,
        //    password2 : "ansdks"
        //  });
        //  new_user.save().then((u)=>{
        //     console.log("save sunccessfully ");
          
        //  }).catch((err)=>{
        //      console.log(err);
            
        //  })
//import mongoose = from'mongoose';
// const schema = new mongoose.schema{

app.use(express.static("public"));
io.on("connection", (socket) => {
    socket.emit("list" , "List");
    socket.on("register user", (nameD,email, password1,password2, callback) => {

      callback({
        status: "ok"
      });
       const new_user = new USER ({
           name :  nameD, 
           email : email ,
           password :  password1 ,
           password2 : password2
         });
         new_user.save().then((u)=>{
            console.log("save sunccessfully ");
          
         }).catch((err)=>{
             console.log(err);
            
         })
    });

    socket.on("login user", (email,password, callback) => {
        console.log(email);
        console.log(password);
        
        USER.findOne({email : email} ).then((u)=>{
            if(u){
                if(u.password === password)
            {
                callback({
                    status: "ok" 
                    
                  });
                  List.forEach((d) => {
                    console.log(d);
                
           })
         
            }else{
                callback({
                    status: "Not found"
                  });
            }
            }else if(!u){
                callback({
                    status: "Not found"
                  });
            }
        }).catch((err)=>{
           console.log(err);
        })
       
    });
   
    socket.on("feedback data", (name, feedback, callback)=>{
    
        callback({
            status: "ok feedback"
          });
         // console.log(name);
         // console.log(feedback);
        
          const new_feedback = new FEEDBACK ({
            name :  name, 
            feedback : feedback 
    
          });
          new_feedback.save().then((u)=>{
            // console.log("save successfully feddback ");
           
          }).catch((err)=>{
              console.log(err);
             
          })
          
    })
  });
   let List = [] ;

  FEEDBACK.find((error, data) => {
    if (error) {
        console.log(error)
    } else {
        // console.log(data)
        data.forEach((d) => {

                List.push(d); 
              //  console.log(d);
        })
    }

});
 


http.listen(3000 , ()=>{
    console.log("server started ...");
})
