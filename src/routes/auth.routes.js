import { Router } from "express";
import dotenv from "dotenv";
import { maskMailArray } from "../utils/maskMail.js";
import {
    addAuthUser,
    resendOtp,
    sendOtp,
    verifyOtp,
    getUser,
    continueSession,
    logout,
    deleteAuthUser,
} from "../controllers/auth.controller.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

dotenv.config();

// temp route to add user to db
router.get("/test/add-user/:email", addAuthUser);

router.get("/test/delete-user/:email", deleteAuthUser);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/resend-otp", resendOtp);

router.get("/showall", checkAuthentication, getUser);

router.post("/continue-session", checkAuthentication, continueSession);

router.post("/logout", logout);

export default router;
