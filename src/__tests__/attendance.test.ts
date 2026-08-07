import request from "supertest";
import app from "../app";
import { pool } from "../db/pool";

afterAll(async () => {
  await pool.end();
});

describe("GET /screenings/:id/attendance", () => {
  test("returns 200 and an array", async () => {
    const screeningId = "e3fb6c21-2a88-425f-855c-9d66dff5bf01";
    const res = await request(app).get(`/screenings/${screeningId}/attendance`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("POST /screenings/:id/attendance", () => {
  test("reports an attendance if user already clicked on going", async () => {
    const screeningId = "e3fb6c21-2a88-425f-855c-9d66dff5bf01";
    const userId = "d856bfbc-5978-48f3-968a-ea0724c6216c";
    const res = await request(app)
      .post(`/screenings/${screeningId}/attendance`)
      .send({ userId, status: "going", visibility: "public" });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("going");
    expect(res.body.userId).toBe(userId);
  });
});

describe("DELETE /screenings/:id/attendance", () => {
  test("deletes an attendance for a user", async () => {
    const screeningId = "e3fb6c21-2a88-425f-855c-9d66dff5bf01";
    const userId = "d856bfbc-5978-48f3-968a-ea0724c6216c";
    const res = await request(app)
      .delete(`/screenings/${screeningId}/attendance`)
      .send({ userId });

    expect(res.status).toBe(200);
  });
});
