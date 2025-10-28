import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #0d47a1, #1976d2)",
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer",
          }}
        >
          Career<span style={{ color: "#ffeb3b" }}>AI</span>
        </Typography>

        <Box>
          <Button color="inherit" 
          
                  onClick={() => navigate("/")}
          sx={{ textTransform: "none", fontWeight: "500" }}>
            Home
          </Button>
          <Button color="inherit" sx={{ textTransform: "none", fontWeight: "500" }}>
            Careers
          </Button>
          <Button color="inherit" sx={{ textTransform: "none", fontWeight: "500" }}>
            About
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              ml: 2,
              borderRadius: "20px",
            }}
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
