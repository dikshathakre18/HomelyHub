import mongoose from "mongoose";

//Created function for connecting mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb connected")
  }
  catch(error){
    console.error("Mongodb connection failed", error);
    process.exit(1);
  }
}

//We need to export this as it should not be used anymore
export default connectDB;