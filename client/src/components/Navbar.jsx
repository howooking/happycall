import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Toolbar, InputBase, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log(searchTerm);

  const handleSearchModal = () => {
    setIsSearch((prev) => !prev);
  };
  console.log(isSearch);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Happy Call
            </Typography>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              disableElevation
              onClick={handleSearchModal}
            >
              Search
            </Button>
            <NavLink to={"/animal/register"}>
              <Button variant="contained" disableElevation>
                Register
              </Button>
            </NavLink>
            <NavLink to={"/animal"}>
              <Button variant="contained" disableElevation>
                Animal
              </Button>
            </NavLink>
            <NavLink to={"/happycall"}>
              <Button variant="contained" disableElevation>
                Happycall
              </Button>
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch ? <SearchModal /> : null}
    </>
  );
}
