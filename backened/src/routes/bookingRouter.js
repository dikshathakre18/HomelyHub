import express from "express";
const bookingRouter = express.Router();

import {createOrder, verifyPayment, getUserBookings, getBookingDetails}
from "../controllers/bookingController.js";

import {protect} from "../controllers/authController.js";

bookingRouter.get("/",protect,getUserBookings);
bookingRouter.get("/:bookingId",protect,getBookingDetails);
bookingRouter.post("/createOrder",protect,createOrder);
bookingRouter.post("/verifyPayment",protect,verifyPayment);

export{bookingRouter};

  


