import express from "express";
import {
    getPlanners,
    getPlannerById,
    savePlanner,
    updatePlanner,
    deletePlanner
} from "../controllers/PlannerController.js";

const router = express.Router();

router.get('/planners', getPlanners);
router.get('/planners/:id', getPlannerById);
router.post('/planners', savePlanner);
router.patch('/planners/:id', updatePlanner);
router.delete('/planners/:id', deletePlanner);


export default router;