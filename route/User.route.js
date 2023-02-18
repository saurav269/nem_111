    const express = require("express")
const { New_user_Model } = require("../model/User.Models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require('dotenv').config()


      const userRouter = express.Router()


      userRouter.post("/register", async(req,res) =>{
        const {name,email,pass} = req.body
          try{
            bcrypt.hash( pass,5, async(err,hash) =>{
                if(err){
                    console.log(err)
                }else{
                    const user = new New_user_Model({name, email, pass : hash})
                    await user.save()
                    res.send("Register Succesfully")
                }
            })
          }catch(err){
            console.log(err)
          }
      })

      userRouter.post("/login", async(req,res) =>{
        const {email,pass} = req.body
        try{
          const user =   await New_user_Model.find({email : email})
          if(user.length > 0){
            bcrypt.compare(pass, user[0].pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID : user[0]._id}, process.env.key)
                    res.send({"msg" : "Logged in successfully", "token" : token})
                }else{
                    res.send("Wrong Credential")
                }          
            } )
          }else{
            res.send("Wrong Credential")
          }
        }catch(err){
            console.log(err)
        }
      })



      module.exports ={userRouter}