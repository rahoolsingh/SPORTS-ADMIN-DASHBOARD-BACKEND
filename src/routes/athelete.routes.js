import { Router } from "express";
import {
    allAtheletesCount,
    listAtheletes,
    markStatusApproved,
    markStatusRejected,
    pendingAtheletes,
    pendingAtheletesCount,
} from "../controllers/athelete.controller.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

router.get("/list-all", checkAuthentication, listAtheletes);

router.get("/pending-list", checkAuthentication, pendingAtheletes);

router.get("/pending-count", checkAuthentication, pendingAtheletesCount);

router.get("/all-count", checkAuthentication, allAtheletesCount);

router.put("/mark-approved/:regNo", checkAuthentication, markStatusApproved);

router.put("/mark-rejected/:regNo", checkAuthentication, markStatusRejected);

export default router;
