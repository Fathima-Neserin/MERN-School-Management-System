const mongoose = require('mongoose');

const FeesHistorySchema = new mongoose.Schema({
     feeName:{
        type: String,
        required: true,
     },
     amount:{
        type: Number,
        required:true
     },
     studentName:{
        type: String,
        required: true,
     },
     studentID:{
        type: Number,
        required:true
     },
     section:{
        type:String,
        required:true
     },
     paidDate:{
        type:String,
        required:true
     }
},{timestamps:true})

module.exports = mongoose.model("feeshistories", FeesHistorySchema);