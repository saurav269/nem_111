  const mongoose = require("mongoose")


     const userSchema = mongoose.Schema({

        name : String,
        email : String,
        pass : String,
     },{
        versionKey  : false
     })

     const New_user_Model = mongoose.model('newUser', userSchema)

     module.exports ={New_user_Model}



     //63ee7722b98504f042a55060