import app from "./app";
import { pool } from "./db/pool";

const PORT = process.env.PORT || 3000;

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("DB connected:", res.rows[0]);
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
