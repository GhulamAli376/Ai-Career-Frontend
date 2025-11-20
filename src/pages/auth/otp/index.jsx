import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../../../utilis';
import apiEndPoint from '../../../constant/apiEndPoint';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Lottie from 'lottie-react';
import otpAnim from "../../../assets/Verify personal documents - EKYC.json";

const OtpVerification = () => {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // OTP Verify
  const handleOtpVerification = async () => {
    try {
      setLoading(true);
      const finalOtp = otp.join('');
      if (finalOtp.length !== 6) {
        toast.error("Please enter all 6 digits");
        return;
      }
      const updateObj = { otp: finalOtp, email };
      const response = await axios.post(`${BASE_URL}${apiEndPoint.otpVerification}`, updateObj);
      if (response.data.status) {
        toast.success("Account Verified 🎉");
        navigate('/login');
      } else {
        toast.error(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}${apiEndPoint.otpResend}`, { email });
      if (res.data.status) {
        toast.success("OTP resent successfully 🚀");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  // Countdown
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(countdown);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Autofocus
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Typing
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Backspace
  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Submit
  const handleSubmit = () => {
    if (otp.includes('')) {
      toast.error("Please fill all fields");
      return;
    }
    handleOtpVerification();
  };

  // Resend
  const handleResend = async () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(60);
    await resendOtp();
    inputRefs.current[0]?.focus();
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        background: "linear-gradient(135deg, #1A1A2E, #16213E, #533483)",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          borderRadius: 4,
          overflow: "hidden",
          width: isSmallScreen ? "95%" : "80%",
          maxWidth: 900,
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.15)",
          color: "white",
          mt: isSmallScreen ? 2 : 0,
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
            p: isSmallScreen ? 2 : 3,
          }}
        >
          <Lottie
            animationData={otpAnim}
            style={{
              width: isSmallScreen ? 200 : 350,
              height: isSmallScreen ? 200 : 350,
            }}
          />
        </Box>

        {/* Right Form */}
        <Box
          sx={{
            flex: 1,
            p: isSmallScreen ? 3 : 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h6' : 'h4'}
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color="white"
          >
            Email Verification
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            mb={4}
            color="white"
          >
            Enter the 6-digit code sent to <strong>{email}</strong>.
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={isSmallScreen ? 1 : 2}
            mb={3}
            sx={{
              overflowX: 'auto',
              flexWrap: 'nowrap',
            }}
          >
            {otp.map((value, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: 'center',
                    color: 'white',
                    fontSize: isSmallScreen ? '16px' : '20px',
                    width: isSmallScreen ? '35px' : '40px',
                    height: isSmallScreen ? '40px' : '54px',
                    borderRadius: '8px',
                  },
                }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            size={isSmallScreen ? "medium" : "large"}
            sx={{
              mt: isSmallScreen ? 1.5 : 2,
              background: "linear-gradient(90deg, #6f86d6, #48c6ef)",
            }}
            disabled={otp.includes('') || loading}
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : "Verify"}
          </Button>

          <Typography variant="body2" textAlign="center" mt={3}>
            {timer > 0 ? (
              <>Resend OTP in <strong>{timer}s</strong></>
            ) : (
              <Button
                onClick={handleResend}
                variant="text"
                sx={{ textTransform: 'none', mt: 1, color: 'white' }}
              >
                Resend OTP
              </Button>
            )}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default OtpVerification;
