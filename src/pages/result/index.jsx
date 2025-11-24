import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Container,
} from "@mui/material";
import Navbar from "../../components/navBar";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import downloadPDF from "../../components/downloadPDF/index.jsx";
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
console.log("API returned:", data);
      setAiResponse(data.roadmap || "⚠️ No roadmap generated. Try again.");
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("⚠️ Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  const formatRoadmap = (text) => {
    const steps = text.split(/\n+/).filter((line) => line.trim() !== "");
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          mt: 4,
        }}
      >
        {steps.map((step, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                width: { xs: "90%", sm: "400px" },
                minHeight: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px",
                background: "linear-gradient(135deg,#6a11cb,#2575fc)",
                color: "#fff",
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              <Typography fontWeight="bold">{step}</Typography>
            </Paper>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  width: "2px",
                  height: "40px",
                  background: "linear-gradient(180deg,#6a11cb,#2575fc)",
                  position: "relative",
                  mx: "auto",
                  "&:after": {
                    content: '" "',
                    position: "absolute",
                    bottom: "-8px",
                    left: "-8px",
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: "10px solid #6a11cb",
                  },
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg,#dfe9f3 0%, #fff 100%)", pb: 6 }}>
      <Navbar />

      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          fontWeight="800"
          sx={{
            background: "linear-gradient(90deg,#1e3c72,#2a5298)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Your AI-Powered Career Map
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#4f4f4f", fontSize: "1.1rem" }}>
          Enter your details and watch AI craft a personalized journey for you ✨
        </Typography>

        {/* INPUT FORM */}
        <Box sx={{ mt: 4 }}>
          <TextField fullWidth label="Your Name" name="name" value={userDetails.name} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Field of Interest" name="field" value={userDetails.field} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Skill Level" name="skillLevel" value={userDetails.skillLevel} onChange={handleChange} sx={{ mb: 3 }} />

          <Button
            variant="contained"
            fullWidth
            onClick={generateRoadmap}
            disabled={loading}
            startIcon={<AutoAwesomeIcon />}
            sx={{
              py: 1.6,
              borderRadius: "25px",
              fontWeight: "bold",
              fontSize: "1.05rem",
              background: "linear-gradient(90deg,#4776E6,#8E54E9)",
              boxShadow: "0 6px 18px rgba(142,84,233,0.45)",
              "&:hover": { transform: "scale(1.03)", transition: "0.25s" },
            }}
          >
            {loading ? "Generating..." : "Generate Career Roadmap"}
          </Button>

          {loading && (
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <Lottie animationData={aiLoading} loop style={{ width: 180, height: 180 }} />
            </Box>
          )}

          {/* ROADMAP DISPLAY */}
          {aiResponse && (
  <div id="roadmap-content">
    {formatRoadmap(aiResponse)}
  </div>
)}


          {/* DOWNLOAD BUTTON */}
          {aiResponse && (
            <Box textAlign="center" sx={{ mt: 4 }}>
              <Button
                onClick={() => downloadPDF(userDetails.field)}
                variant="contained"
                sx={{
                  borderRadius: "25px",
                  px: 4,
                  py: 1.3,
                  fontWeight: "bold",
                  background: "linear-gradient(90deg,#6a11cb,#2575fc)",
                  boxShadow: "0 6px 15px rgba(37,117,252,0.4)",
                  textTransform: "none",
                  "&:hover": { transform: "scale(1.05)", transition: "0.3s ease" },
                }}
              >
                📄 Download as PDF
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Result;
