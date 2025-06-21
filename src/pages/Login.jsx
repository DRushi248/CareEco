import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Container,
} from '@mui/material';
import { HowToVote, People, Security } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import OTPVerification from '../components/OTPVerification';

const Login = () => {
  const [step, setStep] = useState('details');
  const [userType, setUserType] = useState('voter');
  const [formData, setFormData] = useState({
    aadhar: '',
    voterId: '',
    mobile: '',
    name: '',
    officerId: '',
    officerPassword: '',
  });

  const navigate = useNavigate();

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (userType === 'voter') {
      if (!formData.aadhar || !formData.voterId || !formData.mobile || !formData.name) {
        alert('Please fill all required fields');
        return;
      }
    } else {
      if (!formData.officerId || !formData.officerPassword) {
        alert('Please enter officer credentials');
        return;
      }
    }
    setStep('otp');
  };

  const handleOTPVerified = () => {
    const userData =
      userType === 'voter'
        ? {
            aadhar: formData.aadhar,
            voterId: formData.voterId,
            mobile: formData.mobile,
            name: formData.name,
            constituency: 'Mumbai North',
            hasVoted: false,
          }
        : {
            officerId: formData.officerId,
            name: 'Election Officer',
            constituency: 'Mumbai North',
          };

    localStorage.setItem('user', JSON.stringify(userData));

    if (userType === 'voter') navigate('/voter');
    else navigate('/officer');
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 2,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #ff9800, #4caf50)',
            mb: 2,
          }}
        >
          <HowToVote sx={{ fontSize: 40, color: 'white' }} />
        </Box>
        <Typography variant="h3" gutterBottom>
          Digital Voting Platform
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Secure • Transparent • Democratic
        </Typography>
      </Box>

      {step === 'details' && (
        <Card sx={{ boxShadow: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Secure Login
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Verify your identity to participate in democracy
            </Typography>

            <Tabs
              value={userType}
              onChange={(e, newValue) => setUserType(newValue)}
              variant="fullWidth"
              sx={{ mb: 3 }}
            >
              <Tab
                value="voter"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People /> Voter
                  </Box>
                }
              />
              <Tab
                value="officer"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Security /> Officer
                  </Box>
                }
              />
            </Tabs>

            <Box component="form" onSubmit={handleSubmitDetails} sx={{ mt: 2 }}>
              {userType === 'voter' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Aadhar Number"
                    value={formData.aadhar}
                    onChange={handleInputChange('aadhar')}
                    inputProps={{ maxLength: 12 }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Voter ID"
                    value={formData.voterId}
                    onChange={handleInputChange('voterId')}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    value={formData.mobile}
                    onChange={handleInputChange('mobile')}
                    required
                  />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Officer ID"
                    value={formData.officerId}
                    onChange={handleInputChange('officerId')}
                    required
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    value={formData.officerPassword}
                    onChange={handleInputChange('officerPassword')}
                    required
                  />
                </Box>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, py: 1.5 }}
              >
                Verify & Continue
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {step === 'otp' && (
        <OTPVerification
          mobile={formData.mobile || 'Officer Login'}
          onVerified={handleOTPVerified}
          onBack={() => setStep('details')}
        />
      )}
    </Container>
  );
};

export default Login;
