import React from "react";
import { Iresult } from "../pages";

interface ISearch {
  setMovies: React.Dispatch<React.SetStateAction<Array<Iresult>>>;
}
export const Search: React.FC<ISearch> = ({ setMovies }) => {
  return <div>Search Component</div>;
};
