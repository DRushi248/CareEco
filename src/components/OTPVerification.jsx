
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Alert,
} from '@mui/material';
import { ArrowBack, Security } from '@mui/icons-material';

const OTPVerification = ({ mobile, onVerified, onBack }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const mockOTP = '123456';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerifyOTP = () => {
    if (otp === mockOTP) {
      onVerified();
    } else {
      alert('Invalid OTP. Demo OTP: 123456');
    }
  };

  const handleResendOTP = () => {
    setTimeLeft(30);
    setCanResend(false);
    alert('New OTP has been sent to your mobile number');
  };

  return (
    <Card sx={{ boxShadow: 6 }}>
      <CardContent sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ 
          display: 'inline-flex', 
          p: 2, 
          borderRadius: '50%', 
          background: 'linear-gradient(45deg, #4caf50, #2196f3)',
          mb: 2 
        }}>
          <Security sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        
        <Typography variant="h5" gutterBottom>
          OTP Verification
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter the 6-digit code sent to {mobile.includes('Officer') ? 'your registered device' : mobile}
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Demo OTP: <strong>123456</strong>
        </Alert>

        <TextField
          fullWidth
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '1.5rem' } }}
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 3 }}>
          {!canResend ? (
            <Typography variant="body2" color="text.secondary">
              Resend OTP in {timeLeft}s
            </Typography>
          ) : (
            <Button variant="text" onClick={handleResendOTP}>
              Resend OTP
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={onBack}
            fullWidth
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleVerifyOTP}
            disabled={otp.length !== 6}
            fullWidth
          >
            Verify & Login
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;