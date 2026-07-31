import { Request, Response } from "express";
import { analyzeRequirement } from "../services/requirementService";
import { parseRequirement } from "../utils/parseRequirment";

export async function analyzeRequirementController(req: Request, res: Response) {
  try {
    const { requirement } = req.body;

    const rawResponse = await analyzeRequirement(requirement);

    const analysis = parseRequirement(rawResponse);

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to anayze Requirement" });
  }
}