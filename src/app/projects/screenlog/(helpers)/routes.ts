// TODO: migrate the remaining hand-built route strings (Header, SearchBar, ResultCard, MovieHighlight) to these helpers
const SCREENLOG_ROOT = "/projects/screenlog";

export const screenlogRoutes = {
  movie: (id: number) => `${SCREENLOG_ROOT}/movie/${id}`,
  tvShow: (id: number) => `${SCREENLOG_ROOT}/tv-show/${id}`,
  person: (id: number) => `${SCREENLOG_ROOT}/people/${id}`,
};
