import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

const SearchInput = (props) => {
  const [searchText, setSearchText] = useState("");

  const handleReset = () => {
    setSearchText("");
    props.resetHandle();
  };
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <>
      <TextField
        className={props.className}
        onChange={handleSearch}
        value={searchText}
        variant="outlined"
        placeholder="Search Price...."
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  props.onSearchHandler(searchText);
                }}
              />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        size="medium"
        color="success"
        sx={{ cursor: "pointer" }}
        onClick={handleReset}
      >
        Reset
      </Button>
    </>
  );
};

export default SearchInput;
