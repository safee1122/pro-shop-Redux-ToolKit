import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb is connected ${conn.connection.host}`);
  } catch (err) {
    console.log(`error:${err.message}`);
  }
};

export default connectDB;
