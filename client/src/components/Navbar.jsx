//Navbar과 검색기능

import * as React from "react";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
              onClick={() => setOpen(true)}
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
        <SearchModal open={open} setOpen={setOpen} />
      </Box>
    </>
  );
}
