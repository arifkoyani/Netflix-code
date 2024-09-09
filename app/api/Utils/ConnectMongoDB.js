const mongoose = require("mongoose");

const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mongodb:1234567890@cluster0.7tda4.mongodb.net/"
    );
    console.log("connect to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
export default ConnectMongoDB;
