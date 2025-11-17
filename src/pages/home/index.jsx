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
import Cookies from "js-cookie";
export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        color: "#1A1A2E",
      }}
    >
      <Navbar />

      {/* ==== Hero Section ==== */}
      <Container sx={{ py: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          {/* Left Text */}
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
                color: "#1A1A2E",
                mb: 2,
              }}
            >
              Your AI Career Companion 🚀
            </Typography>

            <Typography variant="h6" sx={{ color: "#533483", mb: 4 }}>
              Discover your strengths, predict your future, and let AI guide
              your professional journey.
            </Typography>

            <Stack direction="row" spacing={2}>
             <Button
  variant="contained"
  sx={{
    borderRadius: "25px",
    px: 4,
    py: 1.5,
    fontWeight: "bold",
    fontSize: "1rem",
    background: "linear-gradient(90deg, #6f86d6, #48c6ef)",
    boxShadow: "0 4px 10px rgba(72,198,239,0.4)",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "0.3s",
    },
  }}
  onClick={() => {
    const data = Cookies.get("userData");

    if (!data) {
      console.log("User not logged in");
      return;
    }

    const user = JSON.parse(data);

    console.log(user);

    if (user.isVerified === true) {
      navigate("/pathfinder");
    } else {
      console.log("Please verify account first");
    }
  }}
>
  Find Your Career Path
</Button>


              <Button
                variant="outlined"
                sx={{
                  color: "#6f86d6",
                  borderColor: "#6f86d6",
                  borderRadius: "25px",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  "&:hover": {
                    background: "rgba(111,134,214,0.08)",
                    borderColor: "#48c6ef",
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>
          </motion.div>

          {/* Right Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ flex: 1, display: "flex", justifyContent: "center" }}
          >
            <Lottie
              animationData={aiThinking}
              loop
              style={{ width: "80%", maxWidth: "500px" }}
            />
          </motion.div>
        </Box>
      </Container>

      {/* ==== Features Section ==== */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{
            color: "#1A1A2E",
            mb: 1,
          }}
        >
          Why Choose CareerAI?
        </Typography>
        <Typography align="center" sx={{ color: "#533483", mb: 6 }}>
          Smart insights powered by Artificial Intelligence
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              icon: <Psychology sx={{ fontSize: 50, color: "#48c6ef" }} />,
              title: "AI Career Analysis",
              desc: "Get insights about your strengths and matching career paths.",
            },
            {
              icon: <TrendingUp sx={{ fontSize: 50, color: "#48c6ef" }} />,
              title: "Future Growth Prediction",
              desc: "Find out which industries will thrive — stay ahead of the trend.",
            },
            {
              icon: <Work sx={{ fontSize: 50, color: "#48c6ef" }} />,
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
                  elevation={4}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    textAlign: "center",
                    backgroundColor: "#fafafa",
                    color: "#1A1A2E",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      transition: "0.3s",
                      boxShadow: "0 10px 25px rgba(72,198,239,0.2)",
                    },
                  }}
                >
                  {item.icon}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 2, color: "#1A1A2E" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "#555", mt: 1 }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
