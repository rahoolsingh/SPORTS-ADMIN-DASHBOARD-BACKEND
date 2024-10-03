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

import atheleteRoutes from "./routes/athelete.routes.js";
app.use("/api/v1/athelete", atheleteRoutes);

import coachRoutes from "./routes/coach.routes.js";
app.use("/api/v1/coach", coachRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

export default app;
