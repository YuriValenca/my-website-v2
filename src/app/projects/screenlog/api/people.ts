import { PersonList } from "../types/people";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  "Content-type": "application/json",
}

async function searchPeople(query: string): Promise<PersonList> {
  const res = await fetch(
    `${BASE_URL}/search/person?query=${encodeURIComponent(query)}&page=1`,
    { headers }
  );

  if (!res.ok) throw new Error (`Failed to fetch people: ${res.status}`);

  return res.json() as Promise<PersonList>;
}

export {
  searchPeople,
}
