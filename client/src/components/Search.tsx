import React, { useCallback, useEffect, useRef, useState } from "react";
import { Idata, Iresult } from "../pages";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios, { AxiosResponse } from "axios";
import { API } from "../utils";

import _ from "lodash";

interface ISearch {
  setMovies: React.Dispatch<React.SetStateAction<Array<Iresult>>>;
  page: number;
}

export const Search: React.FC<ISearch> = ({ setMovies, page }) => {
  const [searchValue, setSearchValue] = useState("");
  const searchInput = useRef("");

  useEffect(() => {
    // let cancel: any;
    if (searchInput.current.length < 3) return;
    handleSearch();
    // eslint-disable-next-line
  }, [searchInput.current, page]);

  function searchMovies() {
    axios
      .get(
        `${API}/search/movies?query=${searchInput.current}&page=${page}`
        // {
        // cancelToken: new axios.CancelToken((c) => (cancel = c)),
        // }
      )
      .then((res: AxiosResponse<Idata>) => {
        setMovies(res.data.results || []);
      })
      .catch((e) => {
        // if (axios.isCancel(e)) {
        //   return;
        // }
        console.log(e.message);
      });
  }

  const handleSearch = useCallback(_.debounce(searchMovies, 500), [page]);

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
            searchInput.current = e.target.value;
          }}
        />
      </InputGroup>
    </Box>
  );
};
