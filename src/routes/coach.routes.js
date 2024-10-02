import { Router } from "express";
import {
    allCoachesCount,
    listCoaches,
    markStatusApproved,
    markStatusRejected,
    pendingCoaches,
    pendingCoachesCount,
} from "../controllers/coach.controller.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

router.get("/list-all", checkAuthentication, listCoaches);

router.get("/pending-list", checkAuthentication, pendingCoaches);

router.get("/pending-count", checkAuthentication, pendingCoachesCount);

router.get("/all-count", checkAuthentication, allCoachesCount);

router.put("/mark-approved/:regNo", checkAuthentication, markStatusApproved);

router.put("/mark-rejected/:regNo", checkAuthentication, markStatusRejected);

export default router;
