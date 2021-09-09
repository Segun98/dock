import { Box, Button, Flex } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { MovieList } from "../components/MovieList";
import { Search } from "../components/Search";
import { API } from "../utils";

export interface Iresult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  genres: Array<{ id: number; name: string }>;
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
export interface Idata {
  results: Array<Iresult>;
  total_pages: number;
}

export const Home = () => {
  const [movies, setMovies] = useState<Array<Iresult>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();

  const currentPage = useRef(1);

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line
  }, []);

  const getMovies = async () => {
    try {
      setLoading(true);

      const res: AxiosResponse<Idata> = await axios.get(
        `${API}/movie/popular?page=${page}`
      );

      setTotalPages(res.data.total_pages);

      setMovies(res.data.results);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      console.log(error.message);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    currentPage.current++;
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
    currentPage.current--;
  };

  return (
    <div>
      <Box
        textAlign="center"
        fontWeight="bold"
        my={5}
        fontSize={["0.9rem", "1rem", "2rem"]}
      >
        Popular Movies
      </Box>
      <Search setMovies={setMovies} page={page} />
      <MovieList movies={movies} loading={loading} />

      {!loading && movies.length > 0 && (
        <Box mx="auto" w={["90%", "50%"]} py="5rem">
          <Flex justify="space-between">
            {currentPage.current > 1 && (
              <Button onClick={handlePrevPage}>Previous Page</Button>
            )}

            {currentPage.current === totalPages ? (
              ""
            ) : (
              <Button onClick={handleNextPage}>Next Page</Button>
            )}
          </Flex>
        </Box>
      )}
    </div>
  );
};
