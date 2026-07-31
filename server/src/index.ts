import express from "express";
import cors from "cors";

import requirementRoutes from "./routes/requirementRoutes";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// transaction route
app.post("/api", transactionRoutes);

// analyze requirement route
app.post("/api", requirementRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});