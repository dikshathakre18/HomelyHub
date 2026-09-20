import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router} from "./routes/userRoutes.js"
import {propertyRouter} from "./routes/propertyRouter.js"
import connectDB from "./utils/db.js";
import {bookingRouter} from "./routes/bookingRouter.js"
import { tripRouter } from "./routes/tripRouter.js";

//This loads the .env in the index.js
dotenv.config();

//This creates an application
const app = express();

//Middlewares
//express.json it reads incoming requests with JSON payloads and is based on body-parser.
app.use(express.json({limit:"100mb"}));

//urlencoded
app.use(express.urlencoded({limit:"100mb",extended:true}));

//cookieParser
app.use(cookieParser());

app.use(cors({
  origin:process.env.ORIGIN_ACCESS_URL,
  credentials:true
}))


//Port number the application will run in this port number
const port = process.env.PORT;

//Create test route
app.get("/",(req,res)=>{
  res.send("Homelyhub server is running")
})

app.use("/api/v1/rent/user",router)
app.use("/api/v1/rent/listing",propertyRouter)
app.use("/api/v1/rent/user/booking",bookingRouter)
app.use("/api/v1/rent/trip", tripRouter)

//Call the method
connectDB();


//Start server and keep it running
app.listen(port,()=>{
  console.log(`App is running on port number: ${port}`);
})
