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
import loginAnim from "../../../assets/Typing Animation.json";
import { BASE_URL } from "../../../utilis";
import apiEndPoint from "../../../constant/apiEndPoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // for screens < 600px
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // for screens < 900px

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}${apiEndPoint.login}`, {
        email,
        password,
      });
      if (!response.data.status) throw new Error(response.data.message);

      delete response.data.data.password;
      Cookies.set("userData", JSON.stringify(response.data.data));
      Cookies.set("token", response.data.token);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
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
        overflow: "hidden",
        background: "linear-gradient(135deg, #1A1A2E, #16213E, #533483)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : isTablet ? "90%" : "80%",
          maxWidth: 900,
          height: isMobile ? "97vh" : "auto",
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.15)",
          color: "white",
        }}
      >
        {/* Left Animation */}
        {(
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
           <Lottie
  animationData={loginAnim}
  style={{
    width: isMobile ? "70%" : isTablet ? "80%" : "90%",   // Mobile -> choti, Tablet -> normal, Laptop -> badi
    maxWidth: isMobile ? 220 : isTablet ? 350 : 450,      // Max width responsive
  }}
/>

          </Box>
        )}

        {/* Right Form */}
        <Box
          sx={{
            flex: 1,
            p: isMobile ? 2 : 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h4"}
            fontWeight={600}
            mb={2}
            textAlign="center"
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" mb={3} textAlign="center">
            Login to your AI Career account
          </Typography>

          <TextField
            label="Email"
            fullWidth
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />

          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              py: 1.5,
              fontSize: 16,
              borderRadius: 2,
              background: "linear-gradient(90deg, #6f86d6, #48c6ef)",
            }}
          >
            {loading ? "Please wait..." : "Login"}
          </Button>

          <Typography mt={3} textAlign="center">
            Don’t have an account?{" "}
            <Button sx={{ color: "#90caf9" }} onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
