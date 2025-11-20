import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Lottie from "lottie-react";
import signupAnim from "../../../assets/STUDENT.json";
import { BASE_URL } from "../../../utilis";
import apiEndPoint from "../../../constant/apiEndPoint";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}${apiEndPoint.signUp}`, {
        fullName,
        email,
        password,
      });

      if (!response.data.status) throw new Error(response.data.message);
      toast.success("Signup successful! Please verify OTP.");
      navigate("/otp-verification", { state: { email: email } });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: isMobile ? 1 : 2,
        background: "linear-gradient(135deg, #1A1A2E, #16213E, #533483)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "95%" : isTablet ? "90%" : "80%",
          maxWidth: 900,
          height: isMobile ? "auto" : "85vh",
          borderRadius: 4,
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.15)",
          color: "white",
        }}
      >
        {/* Left Animation */}
        <Box
          sx={{
            flex: isMobile ? "none" : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: isMobile ? 1 : 3,
          }}
        >
          <Lottie
            animationData={signupAnim}
            style={{
              width: isMobile ? "55%" : isTablet ? "70%" : "80%",
              maxWidth: isMobile ? 160 : isTablet ? 250 : 350,
            }}
          />
        </Box>

        {/* Right Form */}
        <Box
          sx={{
            flex: 1,
            p: isMobile ? 2 : 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
            fontWeight={600}
            mb={isMobile ? 1 : 2}
            textAlign="center"
          >
            Create Account
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            mb={isMobile ? 2 : 3}
            textAlign="center"
          >
            Sign up and start your AI career journey!
          </Typography>

          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ mb: isMobile ? 1 : 2 }}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: isMobile ? 1 : 2 }}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: isMobile ? 2 : 3 }}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />

          <Button
            variant="contained"
            onClick={handleSignup}
            sx={{
              py: isMobile ? 1 : 1.4,
              fontSize: isMobile ? 14 : 16,
              borderRadius: 2,
              background: "linear-gradient(90deg, #6f86d6, #48c6ef)",
            }}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </Button>

          <Typography
            mt={isMobile ? 1 : 3}
            textAlign="center"
            variant={isMobile ? "body2" : "body1"}
          >
            Already have an account?{" "}
            <Button sx={{ color: "#90caf9" }} onClick={() => navigate("/login")}>
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
