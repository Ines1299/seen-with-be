import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

// Neon serverless driver uses WebSocket/HTTP (port 443). Plain `pg` TCP to
// :5432 times out in networks that block outbound Postgres.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
