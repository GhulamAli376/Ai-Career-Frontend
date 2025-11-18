import React, { useState } from "react";
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
import LoginRequiredDialog from "../../components/loginRequiredDialog/LoginRequiredDialog";
export default function Home() {
  const navigate = useNavigate();
const [openLoginDialog, setOpenLoginDialog] = useState(false);

  return (
   <Box
  sx={{
    minHeight: "100vh",
    bgcolor: "linear-gradient(180deg, #f0f4ff, #ffffff)",
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
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ flex: 1 }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: 2,
            background: "linear-gradient(90deg, #6f86d6, #48c6ef)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          Your AI Career Companion 🚀
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#533483",
            mb: 4,
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          Discover your strengths, predict your future, and let AI guide your professional journey.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "25px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              background: "linear-gradient(90deg, #6f86d6, #48c6ef)",
              boxShadow: "0 6px 15px rgba(72,198,239,0.4)",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 20px rgba(72,198,239,0.6)",
                transition: "all 0.3s ease",
              },
            }}
            onClick={() => {
              const data = Cookies.get("userData");
              if (!data) return setOpenLoginDialog(true);

              const user = JSON.parse(data);
              if (user.isVerified) navigate("/pathfinder");
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
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(180deg, #e3f2fd, #ffffff)",
          borderRadius: 4,
          padding: 2,
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Lottie animationData={aiThinking} loop style={{ width: "80%", maxWidth: 450 }} />
      </motion.div>
    </Box>
  </Container>

  {/* ==== Features Section ==== */}
  <Container sx={{ py: 10, background: "linear-gradient(180deg,#f9f9ff,#ffffff)" }}>
    <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 1 }}>
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
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-10px) scale(1.02)",
                  boxShadow: "0 15px 30px rgba(72,198,239,0.2)",
                  transition: "0.3s",
                },
              }}
            >
              {item.icon}
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: "#555", mt: 1 }}>{item.desc}</Typography>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>

  <Footer />

  <LoginRequiredDialog
    open={openLoginDialog}
    onClose={() => setOpenLoginDialog(false)}
    onLogin={() => navigate("/login")}
  />
</Box>

  );
}
