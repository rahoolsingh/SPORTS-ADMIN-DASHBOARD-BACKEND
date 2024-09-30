import { Router } from "express";
import dotenv from "dotenv"

const router = Router();

dotenv.config()

// Authorised Emails
const AUTHORISED_MAILS = JSON.parse(process.env.AUTH_MAILS)

router.get("/mail-list", (req, res) => {
    res.send(AUTHORISED_MAILS);
});

export default router;
