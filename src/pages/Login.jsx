import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [role, setRole] = useState('voter');
  const [showOtpField, setShowOtpField] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: '' });
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (aadhaar.length !== 12 || isNaN(aadhaar)) {
      setSnack({ open: true, msg: 'Enter valid 12-digit Aadhaar' });
      return;
    }

    const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otpValue);
    setShowOtpField(true);
    setSnack({ open: true, msg: `Mock OTP sent: ${otpValue}` });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (otp !== generatedOtp) {
      setSnack({ open: true, msg: 'Invalid OTP' });
      return;
    }

    const user = {
      id: aadhaar,
      constituency: 'Pune',
      hasVoted: false,
      role,
    };

    localStorage.setItem('user', JSON.stringify(user));

    if (role === 'voter') navigate('/voter');
    else navigate('/officer');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f0f2f5',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 300 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Aadhaar Number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          margin="normal"
          required
        />

        <Select
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
        >
          <MenuItem value="voter">Voter</MenuItem>
          <MenuItem value="officer">Officer</MenuItem>
        </Select>

        {showOtpField ? (
          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
            required
          />
        ) : (
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleSendOtp}
          >
            Send OTP
          </Button>
        )}

        {showOtpField && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        )}

        <Snackbar
          open={snack.open}
          autoHideDuration={3000}
          message={snack.msg}
          onClose={() => setSnack({ open: false, msg: '' })}
        />
      </Paper>
    </Box>
  );
}
