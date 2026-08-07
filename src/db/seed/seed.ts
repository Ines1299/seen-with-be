import "dotenv/config";
import { db } from "../pool";
import { cinemas, films, screenings, users } from "../schema";

async function seed() {
  const [princeCharles] = await db
    .insert(cinemas)
    .values({
      name: "Prince Charles Cinema",
      area: "Central",
    })
    .returning();

  if (!princeCharles) {
    throw new Error("Failed to insert cinema");
  }

  const [film] = await db
    .insert(films)
    .values({
      title: "Pulp Fiction",
    })
    .returning();
  if (!film) {
    throw new Error("Failed to insert film");
  }

  await db.insert(screenings).values({
    cinemaId: princeCharles.id,
    filmId: film.id,
    externalId: "test-001",
    startsAt: new Date("2026-08-15T19:30:00Z"),
    price: "12.50",
    ticketUrl: "https://princecharlescinema.com",
  });

  const [user] = await db
    .insert(users)
    .values({
      displayName: "Ines",
    })
    .returning();
  if (!user) {
    throw new Error("Failed to insert user");
  }

  console.log("Seeded!");
  process.exit(0);
}

seed();
