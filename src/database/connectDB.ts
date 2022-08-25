import mongoose from "mongoose";

const dbUrl = process.env.MONGO_DB || `mongodb://localhost:27017/typescript`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl),
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      };
    console.log("Database connected...");
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
