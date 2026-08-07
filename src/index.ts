import "dotenv/config";
import express from "express";
import { pool } from "./db/pool";

const app = express();
const PORT = process.env.PORT || 3000;

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("DB connected:", res.rows[0]);
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
