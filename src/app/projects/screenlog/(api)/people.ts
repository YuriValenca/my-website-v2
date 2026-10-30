import { PersonProfile } from "../(types)/people";
import { tmdbFetch } from "./tmdbClient";

const getPerson = (id: number) =>
  tmdbFetch<PersonProfile>(`/person/${id}`, {
    append_to_response: "combined_credits",
  });

export {
  getPerson,
}
