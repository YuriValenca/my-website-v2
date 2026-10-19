import { randomRange } from "@/shared/utils/mathUtils";
import { discoverMovies } from "../(api)/movies";

// 500+ votes keeps the pool to titles with a poster, an overview and a meaningful rating (~8k movies)
const MIN_VOTE_COUNT = 500;
// TMDB answers page > 500 with an error, no matter how many pages it reports
const MAX_PAGES = 500;

export const getSurpriseMovie = async () => {
  const firstPage = await discoverMovies(MIN_VOTE_COUNT);
  const page = randomRange(1, Math.min(firstPage.total_pages, MAX_PAGES));
  const { results } = page === 1 ? firstPage : await discoverMovies(MIN_VOTE_COUNT, page);

  return results[randomRange(0, results.length - 1)];
};
