import express from 'express';
import rateLimit from "express-rate-limit";
import {sendEmailCtr, getAllFeatured} from "../controllers/public.controller.js"
import { validatePublicEmail } from "../validations/public.validation.js";

const publicRouter = express.Router();

const emailLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 3,
  message: { message: "Too many email requests, please try again later." }
});

publicRouter.get("/", getAllFeatured);
publicRouter.post("/email", emailLimiter, validatePublicEmail, sendEmailCtr)

export default publicRouter
