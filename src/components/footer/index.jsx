import React from "react";
import { Box, Container, Grid, Typography, IconButton, Link } from "@mui/material";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1A1A2E, #16213E, #533483)",
        color: "#fff",
        py: 6,
      }}
    >
      <Container>
        <Grid container spacing={5}>
          {/* Left Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
             
            >
              Career <span style={{ color: "#ffeb3b" }}>Scope</span>
            </Typography>
            <Typography variant="body2" width={"70%"}
            sx={{ color: "#cfd8dc", lineHeight: 1.8 }}>
              Your personal AI-powered career guide — helping you choose, grow,
              and succeed in your professional journey.
            </Typography>
          </Grid>

          {/* Middle Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            {["Home", "About", "Careers", "Contact"].map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  color: "#cfd8dc",
                  mb: 1,
                  "&:hover": { color: "#64b5f6", cursor: "pointer" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton sx={{ color: "#64b5f6" }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "#64b5f6" }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: "#64b5f6" }}>
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ color: "#64b5f6" }}>
                <GitHub />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider Line */}
        <Box
          sx={{
            height: "2px",
            width: "100%",
            background: "linear-gradient(90deg, transparent, #42a5f5, transparent)",
            my: 4,
          }}
        />

        {/* Bottom Text */}
        <Typography variant="body2" align="center" sx={{ color: "#b0bec5" }}>
          © {new Date().getFullYear()} CareerScope. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
