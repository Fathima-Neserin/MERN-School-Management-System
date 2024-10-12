const mongoose = require('mongoose');

const dbConnection = async() => {
      try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully");        
      } catch (error) {
        console.error("Error occured,cannot connect to MongoDB:", error.message);
      }
}

module.exports = dbConnection