import { Router } from "express";
import { listAtheletes } from "../controllers/athelete.controller.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

router.get("/list", checkAuthentication, listAtheletes);

export default router;
