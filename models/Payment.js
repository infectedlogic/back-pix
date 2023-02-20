const mongoose = require('mongoose');



const paymentSchema = new mongoose.Schema({
    id: {
        type: String 
    },
    value: {
        type: Number 
    },
    paid_value: {
        type: Number
    },
    paid_at:{
      type: Date
    },
    status :{
      type: String 
    }

})
module.exports = mongoose.model('Payment',paymentSchema)