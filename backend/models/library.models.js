const mongoose = require('mongoose');

const LibraryHistorySchema = new mongoose.Schema({
     bookName:{
        type: String,
        required: true,
     },
     bookId:{
        type: String,
        required:true
     },
     borrowedStudent:{
        type: String,
        required: true,
     },
     studentID:{
        type: Number,
        required:true
     },
     standard:{
        type:Number,
        required:true
     },
     borrowedDate:{
        type: String,
        required:true
        },
    status:{
        type:String,
        enum: ["Available", "Not Availble"]
    },
     returnDate:{
        type: String,
        required: true,
     },
     availableCount:{
        type:Number,
        required:true
     },
     totalCount:{
        type: Number,
        required: true,
     }
},{timestamps:true})

module.exports = mongoose.model("libraryhistories", LibraryHistorySchema);