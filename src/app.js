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

app.get("/api/v1", (req, res) => {
    // setTimeout(() => {
    //     // res.json({ message: "Welcome to the API", success: true, status: 200 });
    // }, 200000);
    res.json({ message: "Welcome to the API", success: true, status: 200 });
    // res.error("Welcome to the API");
});

export default app;
