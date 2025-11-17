import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const navigate = useNavigate();
  const user = Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : null;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("userData");
    handleClose();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #1A1A2E, #16213E, #533483)",
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", letterSpacing: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Career<span style={{ color: "#ffeb3b" }}>AI</span>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ textTransform: "none", fontWeight: "500" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/pathfinder")}
            sx={{ textTransform: "none", fontWeight: "500" }}
          >
            Careers
          </Button>

          {!user && (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/signup")}
                sx={{ textTransform: "none", fontWeight: "bold", ml: 2, borderRadius: "20px" }}
              >
                Create Account
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/login")}
                sx={{ textTransform: "none", fontWeight: "bold", ml: 2, borderRadius: "20px" }}
              >
                Login
              </Button>
            </>
          )}

          {user && (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem disabled>Hello, {user.fullName}</MenuItem>
               
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
