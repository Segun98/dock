import { Box, Spinner, Image, Flex, Button } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Iresult } from ".";
import { API, IMAGE_HOST } from "../utils";

interface IMovie {
  match: {
    params: {
      id: string;
    };
  };
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Movie = () => {
  const [movie, setMovie] = useState<Iresult>();
  const [loading, setLoading] = useState<boolean>(false);

  let query = useQuery();

  useEffect(() => {
    getMovie();
    // eslint-disable-next-line
  }, []);

  const getMovie = async () => {
    try {
      setLoading(true);

      const res: AxiosResponse<Iresult> = await axios.get(
        `${API}/movie/${parseInt(query.get("id") as string)}}`
      );
      setMovie(res.data);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      console.log(error.message);
    }
  };

  return (
    <Box mt={5}>
      <Box textAlign="center" my={5}>
        <Link to="/" style={{ textDecoration: "underline", color: "blue" }}>
          Go Home
        </Link>
      </Box>

      {loading && (
        <Box mt="160px" textAlign="center">
          <Spinner />
        </Box>
      )}

      {!loading && !movie && (
        <Box as="h1" mt="160px" textAlign="center" fontWeight="bold">
          No result... Please ensure this url is correct
        </Box>
      )}

      <Box mx="auto" width="95%">
        {!loading && movie && (
          <Flex m={2} flexDirection={["column", "column", "column", "row"]}>
            <Image
              src={`${IMAGE_HOST}/${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title}
              height={["auto", "auto", "70vh"]}
              maxWidth="95%"
              loading="lazy"
              mr={["", "", "", 4]}
            />
            <Box textAlign="center" wordBreak="break-word" width="100%">
              <Box
                as="h1"
                fontSize={["1rem", "2rem", "2.5rem"]}
                fontWeight="bold"
              >
                {movie.title} {movie.adult && `(18+)`}
              </Box>

              <Box>
                <Flex>
                  <Box as="small" fontWeight="bold">
                    Genre:
                  </Box>
                  {movie.genres?.map((g) => (
                    <Box mx={1} fontSize="0.9rem" key={g.id}>
                      {g.name},
                    </Box>
                  ))}
                </Flex>
              </Box>

              <Box as="p" mt={4}>
                {movie.overview}
              </Box>
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
};
