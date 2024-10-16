const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
     studentName:{
        type: String,
        required: true,
     },
     studentId:{
        type: Number,
        required:true
     },
     standard:{
        type: Number,
        required: true,
     },
     dob:{
        type: String,
        required: true,
     },
     place:{
        type: String,
        required: true,
     },
     age:{
        type: Number,
        required: true,
     },
     gender:{
      type: String,
      enum: ["Boy", "Girl"]
     },
     contactNumber:{
      type: String,
      required: true,
      }
},{timestamps:true})

module.exports = mongoose.model("students", StudentSchema);