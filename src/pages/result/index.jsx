import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Paper,
  Divider,
  Container,
  Fade,
} from "@mui/material";
import Navbar from "../../components/navBar";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import downloadPDF from "../../components/downloadPDF/index.jsx"
import Lottie from "lottie-react";
import aiLoading from "../../assets/two-people-thinking.json";
import { BASE_URL } from "../../utilis/index.js";
import apiEndPoint from "../../constant/apiEndPoint.js";

const Result = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    field: "",
    skillLevel: "",
  });
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const generateRoadmap = async () => {
    setLoading(true);
    setAiResponse("");

    try {
      const response = await fetch(`${BASE_URL}${apiEndPoint.generateAiCareer}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: `Name: ${userDetails.name}, Field: ${userDetails.field}, Skill Level: ${userDetails.skillLevel}`,
        }),
      });

      const data = await response.json();
      setAiResponse(data.roadmap || "⚠️ No roadmap generated. Try again.");
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("⚠️ Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  const formatRoadmap = (text) => {
    const lines = text.split(/\n+/).filter((line) => line.trim() !== "");
    return lines.map((line, index) => (
      <Fade in={true} timeout={400 + index * 100} key={index}>
        <Paper
          elevation={4}
          sx={{
            p: 2.5,
            mb: 2,
            borderRadius: 3,
            background:
              index === 0
                ? "linear-gradient(135deg, #1976d2, #42a5f5)"
                : "#fafafa",
            color: index === 0 ? "white" : "text.primary",
            borderLeft: index !== 0 ? "5px solid #1976d2" : "none",
            boxShadow:
              index === 0
                ? "0 4px 12px rgba(25,118,210,0.4)"
                : "0 2px 8px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: index === 0 ? "bold" : 500,
              fontSize: index === 0 ? "1.1rem" : "1rem",
            }}
          >
            {line}
          </Typography>
        </Paper>
      </Fade>
    ));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(180deg, #e3f2fd, #ffffff)",
        textAlign: "center",
      }}
    >
      <Navbar />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <RocketLaunchIcon color="primary" fontSize="large" />
            AI Career Roadmap Generator
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Get your personalized learning roadmap in seconds 🚀
          </Typography>
        </Box>

        {/* Input Card */}
        <Paper
          sx={{
            p: 4,
            borderRadius: "25px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            background:
              "linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)",
          }}
        >
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Field of Interest (e.g. Web Dev, AI, Cybersecurity)"
            name="field"
            value={userDetails.field}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Current Skill Level (Beginner, Intermediate, Expert)"
            name="skillLevel"
            value={userDetails.skillLevel}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={generateRoadmap}
            disabled={loading}
            startIcon={<AutoAwesomeIcon />}
            sx={{
              borderRadius: "30px",
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1.05rem",
              textTransform: "none",
              boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
              "&:hover": {
                transform: "scale(1.03)",
                transition: "all 0.3s ease",
              },
            }}
          >
            {loading ? "Generating..." : "Generate Roadmap"}
          </Button>

          {loading && (
  <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
    <Lottie
      animationData={aiLoading}
      loop={true}
      style={{ width: 200, height: 200 }}
    />
  </Box>
)}


          {aiResponse && (
            <Fade in={true} timeout={700}>
              <Box sx={{ mt: 5, textAlign: "left" }} id="roadmap-content"> 
                <Divider sx={{ mb: 2 }} />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="primary"
                  gutterBottom
                >
                  🎯 Your Personalized Roadmap
                </Typography>
                {formatRoadmap(aiResponse)}
                <Button
 onClick={() => downloadPDF(userDetails.field)}
  variant="outlined"
  sx={{ mt: 2, borderRadius: "20px" }}
>
  📄 Download as PDF
</Button>

              </Box>
            </Fade>
          )}
        </Paper>
      </Container>

      <style>
        {`
          body {
            background: linear-gradient(180deg, #e3f2fd, #ffffff);
          }
        `}
      </style>
    </Box>
  );
};

export default Result;
