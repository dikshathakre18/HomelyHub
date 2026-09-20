import express from "express";

import {
  getProperties,
  getProperty,
  createProperty,
  getUsersProperties
} from "../controllers/propertyController.js";

import { protect } from "../controllers/authController.js";

const propertyRouter = express.Router();

propertyRouter.route("/").get(getProperties);

propertyRouter
  .route("/user/newAccommodation")
  .post(protect, createProperty);

propertyRouter
  .route("/user/myAccommodation")
  .get(protect, getUsersProperties);

propertyRouter.route("/:id").get(getProperty);

export { propertyRouter };