const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/inventory";

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

module.exports = connectToMongo;