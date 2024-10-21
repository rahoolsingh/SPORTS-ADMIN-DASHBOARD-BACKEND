import auth from "../models/auth.model.js";
import sendMail from "../utils/sendMail.js";
import jwt from "jsonwebtoken";

const sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await auth.findOne({ email });

        if (!user || user.isBlocked) {
            return res.status(404).json({
                message:
                    "Requested user not found. Please check your email and try again!",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = new Date(new Date().getTime() + 5 * 60000);

        await auth.updateOne({ email }, { otp, otpExpires });

        await sendMail(
            email,
            "OTP for Login",
            `Your OTP is ${otp}. It will expire in 5 minutes.`,
            `<h1>Your OTP is ${otp}</h1><p>It will expire in 5 minutes.</p>
            <p>Do not share this OTP with anyone.</p>
            <p>If you did not request this OTP, please ignore this email.</p>`
        );

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await auth
            .findOne({ email })
            .select("otp otpExpires isBlocked tokenExpires");

        if (!user) {
            return res.status(404).json({
                message:
                    "Requested user not found. Please check your email and try again!",
            });
        }

        if (user.isBlocked) {
            return res
                .status(403)
                .json({ message: "User is blocked, contact support" });
        }

        if (new Date() > user.otpExpires) {
            return res.status(400).json({ message: "OTP expired" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP or expired" });
        }

        if (user.otp === otp) {
            const tokenExpires = new Date(new Date().getTime() + 60 * 60000);
            const user = await auth.updateOne(
                { email },
                {
                    otp: "",
                    otpExpires: "",
                    tokenExpires: tokenExpires,
                }
            );

            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.status(200).json({
                message: "OTP verified",
                token,
                sessionExpiry: tokenExpires,
            });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const resendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await auth.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message:
                    "Requested user not found. Please check your email and try again!",
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: "User is blocked" });
        }

        if (new Date() < user.otpExpires) {
            return res.status(400).json({ message: "OTP not expired" });
        }

        const otp = user.otp;
        const otpExpires = new Date(new Date().getTime() + 5 * 60000);

        await auth.updateOne({ email }, { otp, otpExpires });

        await sendMail(
            email,
            "OTP for Login",
            `Your OTP is ${otp}. It will expire in 5 minutes.`,
            `<h1>Your OTP is ${otp}</h1><p>It will expire in 5 minutes.</p>`
        );

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error resending OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// verify jwt token and send user data
const getUser = async (req, res) => {
    // verify token done in checkAuthentication middleware
    console.log("req.user", req.user);
    const user = await auth.findOne({ email: req.user.email });

    if (!user) {
        return res.status(404).json({
            message:
                "Requested user not found. Please check your email and try again!",
        });
    }

    res.status(200).json({ user });
};

const continueSession = async (req, res) => {
    // verify token done in checkAuthentication middleware

    console.log("req.user", req.user);

    const user = await auth.findOne({ email: req.user.email });

    if (!user) {
        return res.status(404).json({
            message:
                "Requested user not found. Please check your email and try again!",
        });
    }

    res.status(200).json({
        message: "Session validated successfully",
        sessionExpiry: user.tokenExpires,
    });
};

const logout = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await auth.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({
                message:
                    "Requested user not found. Please check your email and try again!",
            });
        }

        await auth.updateOne({ email: decoded.email }, { tokenExpires: "" });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// test route to add user to db
const addAuthUser = async (req, res) => {
    // from url params email="email"
    const { email } = req.params;

    console.log("====================================>", email);

    try {
        const user = await auth.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ message: "User already exists", success: false });
        }

        const newUser = new auth({ email });
        await newUser.save();

        res.status(201).json({
            message: "User added successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// test route to delete user from db
const deleteAuthUser = async (req, res) => {
    // from url params email="email"
    const { email } = req.params;

    console.log("====================================>", email);

    try {
        const user = await auth.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await auth.deleteOne({ email });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export {
    sendOtp,
    verifyOtp,
    resendOtp,
    getUser,
    addAuthUser,
    deleteAuthUser,
    continueSession,
    logout,
};
