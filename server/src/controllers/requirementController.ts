import { Request, Response } from "express";
import { analyzeRequirement } from "../services/requirementService";
import { parseRequirement } from "../utils/parseRequirment";
import { extractJson } from "../utils/extractJson";

export async function analyzeRequirementController(req: Request, res: Response) {
  
  try {
    const { requirement } = req.body;

    console.log("Received requirement");

    const rawResponse = await analyzeRequirement(requirement);

    console.log("Received AI Response");

    const json = extractJson(rawResponse);

    console.log("Extracted JSON");

    const analysis = parseRequirement(json);

    console.log("Validation Successful");

    res.json(analysis);
    console.log("Returning Analysis");
  } catch (error) {
    console.error("Analyze Error: ", error);

    res.status(500).json({ error: "Failed to analyze Requirement" });
  }
}