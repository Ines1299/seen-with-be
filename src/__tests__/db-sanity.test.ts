import { pool } from "../db/pool";

afterAll(async () => {
  await pool.end();
});

test("can connect to the database", async () => {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const res = await pool.query("SELECT NOW()");

  expect(res.rows.length).toBe(1);
}, 20000);
