import { pool } from "../db/pool";

afterAll(async () => {
  await pool.end();
});

test("can connect to the database", async () => {
  const res = await pool.query("SELECT NOW()");

  expect(res.rows.length).toBe(1);
}, 20000);
