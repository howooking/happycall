import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Happy Call
          </Typography>
          <NavLink to={"/animal/register"}>
            <Typography sx={{ margin: "10px" }}>Register</Typography>
          </NavLink>
          <NavLink to={"/animal"}>
            <Typography sx={{ margin: "10px" }}>Animal</Typography>
          </NavLink>
          <NavLink to={"/happycall"}>
            <Typography sx={{ margin: "10px" }}>Happycall</Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
