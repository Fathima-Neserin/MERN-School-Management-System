const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     username:{
        type: String,
        required: true,
        unique: true
     },
     password:{
        type: String,
        required: true,
        minlength: 6
     },
     role:{
        type: [String],
        enum: ["Admin", "Staff", "Librarian"]
     },
     name:{
        type: String
     },
     email:{
        type: String
     },
     gender:{
      type: String,
      enum: ["Male", "Female"]
     },
     phoneNumber:{
      type: String,
      
     }
},{timestamps:true})

UserSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
 });

module.exports = mongoose.model("users", UserSchema);