import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
console.log("process.env.OPENROUTER_API_KEY", process.env.OPENROUTER_API_KEY);

import requirementRoutes from "./routes/requirementRoutes";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// transaction route
app.use("/api", transactionRoutes);

// analyze requirement route
app.use("/api", requirementRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

// Require manager approval for purchases over $5000.