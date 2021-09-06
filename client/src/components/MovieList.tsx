import { Box, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { Iresult } from "../pages";
import { IMAGE_HOST } from "../utils";
import { Link } from "react-router-dom";
import slug from "slug";
interface IMovieList {
  movies: Array<Iresult>;
  loading: boolean;
}
export const MovieList: React.FC<IMovieList> = ({ loading, movies }) => {
  return (
    <Box mt={5} mx="auto" w={["70%", "90%"]}>
      {loading && (
        <Box mt="160px" textAlign="center">
          <Spinner />
        </Box>
      )}

      {!loading && movies?.length === 0 ? (
        <Box mt="160px" textAlign="center" fontWeight="bold">
          No results found...
        </Box>
      ) : (
        ""
      )}

      <Flex wrap="wrap">
        {!loading &&
          movies &&
          movies.map((m) => (
            <Box key={m.id} m={2}>
              <img
                src={`${IMAGE_HOST}/${m.backdrop_path || m.poster_path}`}
                alt={m.title}
                width={270}
                height={500}
                loading="lazy"
              />
              <Box textAlign="center" wordBreak="break-word" width="100%">
                <h1>{m.title}</h1>
                <Link
                  to={`/movie/${slug(m.title)}`}
                  style={{ textDecoration: "underline", color: "blue" }}
                >
                  More
                </Link>
              </Box>
            </Box>
          ))}
      </Flex>
    </Box>
  );
};
