import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { MovieList } from "../components/MovieList";
import { Search } from "../components/Search";
import { API } from "../utils";

export interface Iresult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
}
interface Idata {
  results: Array<Iresult>;
}

export const Home = () => {
  const [movies, setMovies] = useState<Array<Iresult>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      setLoading(true);

      const res: AxiosResponse<Idata> = await axios.get(`${API}/movie/popular`);
      setMovies(res.data.results);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      console.log(error.message);
    }
  };

  return (
    <div>
      <Search setMovies={setMovies} />
      <MovieList movies={movies} loading={loading} />
    </div>
  );
};
