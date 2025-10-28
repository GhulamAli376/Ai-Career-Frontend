import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Psychology, TrendingUp, Work } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navBar";
import Footer from "../../components/footer";
import aiThinking from "../../assets/two-people-thinking.json";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "#f4f7ff", minHeight: "100vh" }}>
      <Navbar />

      {/* ==== Hero Section ==== */}
      <Box
        sx={{
          py: 12,
          background: "linear-gradient(135deg, #0a192f 20%, #112d4e 80%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 🔵 Glow Circles */}
        <Box
          sx={{
            position: "absolute",
            top: 80,
            left: 60,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(25, 118, 210, 0.25)",
            filter: "blur(80px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 100,
            right: 100,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(66, 165, 245, 0.25)",
            filter: "blur(80px)",
          }}
        />

        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            {/* Left Side Text */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ flex: 1 }}
            >
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                Your AI Career Companion 🚀
              </Typography>
              <Typography variant="h6" sx={{ color: "#cfd8dc", mb: 4 }}>
                Discover your strengths, predict your future, and let AI guide
                your professional journey.
              </Typography>

              {/* 🧭 Main Button */}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "25px",
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    background:
                      "linear-gradient(90deg, #1976d2, #42a5f5, #64b5f6)",
                    boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
                    "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
                  }}
                  onClick={() => navigate("/pathfinder")}
                >
                  Find Your Career Path
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "#90caf9",
                    borderRadius: "25px",
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    "&:hover": {
                      background: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </motion.div>

            {/* Right Side Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              style={{ flex: 1, display: "flex", justifyContent: "center" }}
            >
              <Lottie
                animationData={aiThinking}
                loop
                style={{ width: "70%", maxWidth: "550px" }}
              />
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* ==== Features Section ==== */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Why Choose CareerAI?
        </Typography>
        <Typography align="center" sx={{ color: "gray", mb: 6 }}>
          Smart insights powered by Artificial Intelligence
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              icon: <Psychology sx={{ fontSize: 50, color: "#1976d2" }} />,
              title: "AI Career Analysis",
              desc: "Get insights about your strengths and matching career paths.",
            },
            {
              icon: <TrendingUp sx={{ fontSize: 50, color: "#1976d2" }} />,
              title: "Future Growth Prediction",
              desc: "Find out which industries will thrive — stay ahead of the trend.",
            },
            {
              icon: <Work sx={{ fontSize: 50, color: "#1976d2" }} />,
              title: "Smart Job Matching",
              desc: "Let AI recommend jobs tailored to your interests and skills.",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: 5,
                    textAlign: "center",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.95))",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 12px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {item.icon}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 2, mb: 1 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">{item.desc}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ==== How It Works Section ==== */}
      <Box sx={{ py: 12, background: "#f9fbff" }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(90deg, #1565c0, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 8,
            }}
          >
            How CareerAI Works ⚙️
          </Typography>

          <Grid container spacing={6}>
            {[
              {
                step: "1️⃣",
                title: "Enter Your Details",
                desc: "Tell us your field, skills, and level — beginner, intermediate or expert.",
              },
              {
                step: "2️⃣",
                title: "AI Analyzes You",
                desc: "Our intelligent engine studies your data and compares it with real career stats.",
              },
              {
                step: "3️⃣",
                title: "Get Career Roadmap",
                desc: "Instantly get a roadmap to success — courses, skills, and growth predictions.",
              },
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.3 }}
                >
                  <Paper
                    elevation={5}
                    sx={{
                      p: 4,
                      borderRadius: 5,
                      textAlign: "center",
                      minHeight: 220,
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      {item.step}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {item.desc}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
