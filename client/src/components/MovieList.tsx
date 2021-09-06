import React from "react";
import { Iresult } from "../pages";

interface IMovieList {
  movies: Array<Iresult>;
  loading: boolean;
}
export const MovieList: React.FC<IMovieList> = ({ loading, movies }) => {
  return <div>Movie Lists</div>;
};
