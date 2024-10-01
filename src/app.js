import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

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
