import { Router } from "express";
import {
    allAtheletesCount,
    listAtheletes,
    pendingAtheletes,
    pendingAtheletesCount,
} from "../controllers/athelete.controller.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

router.get("/list-all", checkAuthentication, listAtheletes);

router.get("/pending-list", checkAuthentication, pendingAtheletes);

router.get("/pending-count", checkAuthentication, pendingAtheletesCount);

router.get("/all-count", checkAuthentication, allAtheletesCount);

export default router;
