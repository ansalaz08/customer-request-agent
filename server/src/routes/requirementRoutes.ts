import { Router } from "express";
import { analyzeRequirementController } from "../controllers/requirementController";

const router = Router();

router.post("/requirement", analyzeRequirementController);

export default router;