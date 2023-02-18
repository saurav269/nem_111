   

   const express = require("express")
const { connection } = require("./db")
require('dotenv').config()
const { authenticate } = require("./middlewares/authenticate.middleware")
const { noteRouter } = require("./route/Note.route")
const { userRouter } = require("./route/User.route")
const cors = require("cors")

   const app = express()

    app.use(cors())

   app.use(express.json())

   app.get("/", (req,res) =>{
     res.send("HOME PAGE")
   })
   app.use("/users", userRouter)
   app.use(authenticate)
   app.use("/notes", noteRouter)



   app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`Server is running on ${process.env.port}`)
    }catch(err){
        console.log(err)
    }
   })