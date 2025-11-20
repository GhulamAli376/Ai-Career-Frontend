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
import otpAnim from '../../../assets/Verify personal documents - EKYC.json';

const OtpVerification = () => {
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) clearInterval(countdown);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpVerification = async () => {
    try {
      setLoading(true);
      const finalOtp = otp.join('');
      if (finalOtp.length !== OTP_LENGTH) {
        toast.error(`Please enter all ${OTP_LENGTH} digits`);
        return;
      }
      const response = await axios.post(`${BASE_URL}${apiEndPoint.otpVerification}`, { otp: finalOtp, email });
      if (response.data.status) {
        toast.success('Account Verified 🎉');
        navigate('/login');
      } else toast.error(response.data.message || 'OTP verification failed');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(60);
    inputRefs.current[0]?.focus();
    try {
      const res = await axios.post(`${BASE_URL}${apiEndPoint.otpResend}`, { email });
      if (res.data.status) toast.success('OTP resent successfully 🚀');
      else toast.error(res.data.message);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A1A2E, #16213E, #533483)',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          borderRadius: 4,
          overflow: 'hidden',
          width: isSmallScreen ? '100%' : isTablet ? '90%' : '80%',
          maxWidth: 1000,
          minHeight: 500,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.15)',
          color: 'white',
        }}
      >
        {/* Animation */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            p: 2,
            minWidth: 180,
          }}
        >
          <Lottie
            animationData={otpAnim}
            style={{
              width: isSmallScreen ? 180 : isTablet ? 260 : 320,
              height: isSmallScreen ? 180 : isTablet ? 260 : 320,
            }}
          />
        </Box>

        {/* Form */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 200,
          }}
        >
          <Typography variant={isSmallScreen ? 'h6' : 'h4'} fontWeight="bold" textAlign="center" mb={2}>
            Email Verification
          </Typography>

          <Typography variant="body2" textAlign="center" mb={3}>
            Enter the {OTP_LENGTH}-digit code sent to <strong>{email}</strong>.
          </Typography>

          {/* OTP Row */}
          <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  gap={isSmallScreen ? 1 : 2}
  mb={3}
  sx={{
     width: '100%',      // full width
    maxWidth: 300,      // maximum width for the row
    mx: 'auto',         // center the container
    flexWrap: 'nowrap',
  }}
>
  {otp.map((value, index) => (
    <TextField
      key={index}
      inputRef={el => (inputRefs.current[index] = el)}
      value={value}
      onChange={e => handleChange(e, index)}
      onKeyDown={e => handleBackspace(e, index)}
      variant="outlined"
      inputProps={{
        maxLength: 1,
        style: {
          textAlign: 'center',
          color: 'white',
          fontSize: isSmallScreen ? 16 : isTablet ? 18 : 20,
          width: isSmallScreen ? 40 : isTablet ? 45 : 50,
          height: isSmallScreen ? 40 : isTablet ? 45 : 52,
        },
      }}
    />
  ))}
</Box>


          {/* Verify Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleOtpVerification}
            size="large"
            sx={{ py: 1.5, background: 'linear-gradient(90deg, #6f86d6, #48c6ef)' }}
            disabled={otp.includes('') || loading}
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : 'Verify'}
          </Button>

          {/* Resend */}
          <Typography variant="body2" textAlign="center" mt={2}>
            {timer > 0 ? (
              <>Resend OTP in <strong>{timer}s</strong></>
            ) : (
              <Button onClick={handleResendOtp} variant="text" sx={{ textTransform: 'none', color: '#90caf9' }}>
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
