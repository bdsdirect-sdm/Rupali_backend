const connection = require('./signup-backend/database');
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
var app = express();

app.use(bodyParser.json())
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200 // For legacy browser support
  }
   
app.use(cors(corsOptions));
   
   

app.listen (3001,()=>console.log('Express server is running on port 3001' ))

app.post('/signup', async(req,res) =>{

 const{firstName,lastName,email,password,dob,gender,phoneNumber, termsAccepted} =req.body;

if (!termsAccepted){
    //return res.status(400).json({message:'You must accept the terms and conditions'});
    }

    const checkEmailQuery = "SELECT *FROM users WHERE email = ?";
    
    connection.query(checkEmailQuery,[email], async(err,results) => {

        if(err){
        return res.status(500).json({message:"Error checking email uniqueness"});
        }
    
    if(results.length >0){
        return res.status(400).json({message:"Email is already use"});
    }
    
        const hashedPassword = await bcrpyt.hash(password, 10);
        const insertQuery = 'INSERT INTO users(firstName,lastName,email,password,dob,gender,phonenumber)VALUES(?,?,?,?,?,?)';

        connection.query (insertQuery,[firstName,lastName,email,hashedPassword,dob,gender,phoneNumber],(err)

        )
        if(err){
            return res.status(500).json({message:"Error inserting user"});
        }
        return res.status(201).json({message:"User registered successfully"});
    });
});








