import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import rateLimit from "express-rate-limit";
import { validateLogout, validateSignIn, validateSignUp, validateForgotPassword, validateResetPassword } from "../validations/auth.validation.js";

const authRouter = Router();
const authControl = new authController();

const limitter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {message: "Too many attemps, please try again later"}
});

authRouter.post('/sign-up', validateSignUp, limitter, authControl.registerAdmin);

authRouter.post('/sign-in', validateSignIn, limitter, authControl.loginAdmin);

authRouter.patch('/logout/:id', validateLogout, limitter, authControl.logoutAdmin);

authRouter.post('/forgot-password', validateForgotPassword, limitter, authControl.forgotPassword);

authRouter.post('/reset-password', validateResetPassword, limitter, authControl.resetPassword);

export default authRouter
