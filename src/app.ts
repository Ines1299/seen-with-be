import "dotenv/config";
import express from "express";
import screeningsRouter from "./routes/screenings";
import attendanceRouter from "./routes/attendance";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(attendanceRouter);
app.use(screeningsRouter);

export default app;
