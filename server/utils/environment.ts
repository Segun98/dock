export const host: string =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

export const API: string = `https://api.themoviedb.org/3/movie/popular`;
export const SEARCH_API: string = `https://api.themoviedb.org/3/search/movie`;
export const A_MOVIE: string = `https://api.themoviedb.org/3/movie`;
