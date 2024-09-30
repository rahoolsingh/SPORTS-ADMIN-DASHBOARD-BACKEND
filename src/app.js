import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(cookieParser());

// routes
import authRoutes from "./routes/auth.routes.js";

app.use("/api/v1/auth", authRoutes);

export default app;
