import { Router } from "express";
import { analyzeRequirementController } from "../controllers/requirementController";

const router = Router();

router.post("/requirements", analyzeRequirementController);

export default router;