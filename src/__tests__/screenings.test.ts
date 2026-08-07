import request from "supertest";
import app from "../app";
import { pool } from "../db/pool";

afterAll(async () => {
  await pool.end();
});

describe("GET /screenings/", () => {
  test("returns 200 and an array", async () => {
    const screeningId = "e3fb6c21-2a88-425f-855c-9d66dff5bf01";
    const res = await request(app).get(`/screenings`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
