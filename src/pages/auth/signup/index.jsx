import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
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
        background: "linear-gradient(135deg, #1A1A2E, #16213E, #533483)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
          width: "80%",
          maxWidth: 900,
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.15)",
          color: "white",
        }}
      >
        {/* Left Animation */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <Lottie animationData={signupAnim} style={{ width: 350, height: 350 }} />
        </Box>

        {/* Right Form */}
        <Box
          sx={{
            flex: 1,
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" fontWeight={600} mb={2} textAlign={"center"}>
            Create Account
          </Typography>
          <Typography variant="body1" mb={3} textAlign={"center"}>
            Sign up and start your AI career journey!
          </Typography>

          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
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
            sx={{ mb: 3 }}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />

          <Button
            variant="contained"
            onClick={handleSignup}
            sx={{
              py: 1.5,
              fontSize: 16,
              borderRadius: 2,
              background: "linear-gradient(90deg, #6f86d6, #48c6ef)",
            }}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </Button>

          <Typography mt={3} textAlign="center">
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
