import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/requirements", (req, res) => {
  return res.json({
    message: "Requirement received",
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});