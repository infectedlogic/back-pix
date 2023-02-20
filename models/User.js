const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true
    },
    email: {
        type: String ,
        required: true
    },
    password: {
        type: String ,
        required: true,
      
    },
    balance:{
      type: Number ,
      default : 0
    },
    cpf :{
      type: String ,
      default: "80425836720",
    }

})
module.exports = mongoose.model('User',userSchema)