import React, { useEffect, useState } from "react";
import { Idata, Iresult } from "../pages";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios, { AxiosResponse } from "axios";
import { API } from "../utils";

interface ISearch {
  setMovies: React.Dispatch<React.SetStateAction<Array<Iresult>>>;
}
export const Search: React.FC<ISearch> = ({ setMovies }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let cancel: any;

    axios
      .get(`${API}/search/movies?query=${searchValue}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res: AxiosResponse<Idata>) => setMovies(res.data.results))
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
      });

    return () => cancel();
  }, [searchValue, setMovies]);

  return (
    <Box mt={5} mx="auto" w="90%">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Start Typing to Search Movies By Title..."
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
          }}
        />
      </InputGroup>
    </Box>
  );
};
