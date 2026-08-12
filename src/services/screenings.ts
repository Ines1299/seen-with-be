import { db } from "../db/pool";
import { screenings, cinemas, films } from "../db/schema";
import { eq } from "drizzle-orm";

export async function getScreenings() {
  return db
    .select({
      id: screenings.id,
      startsAt: screenings.startsAt,
      price: screenings.price,
      ticketUrl: screenings.ticketUrl,
      cinemaName: cinemas.name,
      cinemaArea: cinemas.area,
      filmTitle: films.title,
    })
    .from(screenings)
    .innerJoin(cinemas, eq(screenings.cinemaId, cinemas.id))
    .leftJoin(films, eq(screenings.filmId, films.id));
}
