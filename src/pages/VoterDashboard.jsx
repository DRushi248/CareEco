import { useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Alert,
} from '@mui/material';
import {
  HowToVote,
  Logout,
  Person,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import VotingInterface from '../components/VotingInterface';
import API from '../api';

const VotingDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return navigate('/');
    setUser(storedUser);
    setHasVoted(storedUser.hasVoted);
  }, [navigate]);

  const handleStartVoting = () => {
    setCurrentView('voting');
  };

  const handleVoteSubmitted = () => {
    setHasVoted(true);
    const updatedUser = { ...user, hasVoted: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setCurrentView('dashboard');
    alert('Vote Submitted Successfully! Thank you for participating in democracy!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  if (currentView === 'voting') {
    return (
      <VotingInterface
        user={user}
        onVoteSubmitted={handleVoteSubmitted}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <HowToVote />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Digital Voting
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.constituency}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              icon={<Person />}
              label={user.name}
              variant="outlined"
            />
            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your voice matters in shaping our democracy
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HowToVote sx={{ mr: 1 }} />
                  <Typography variant="h6">Voting Status</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Current election status for {user.constituency}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Your Status:</Typography>
                    {hasVoted ? (
                      <Chip
                        icon={<CheckCircle />}
                        label="Voted"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        label="Pending"
                        color="warning"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Election Phase:</Typography>
                    <Chip
                      label="Active"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Constituency:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {user.constituency}
                    </Typography>
                  </Box>
                </Box>

                {!hasVoted && (
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<HowToVote />}
                    onClick={handleStartVoting}
                    sx={{ py: 1.5 }}
                  >
                    Cast Your Vote
                  </Button>
                )}

                {hasVoted && (
                  <Alert severity="success" icon={<CheckCircle />}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      Thank you for voting!
                    </Typography>
                    <Typography variant="body2">
                      Your vote has been securely recorded and counted.
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Voter Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Voter ID
                    </Typography>
                    <Typography variant="body2">{user.voterId}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Aadhar
                    </Typography>
                    <Typography variant="body2">
                      XXXX XXXX {user.aadhar.slice(-4)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Mobile
                    </Typography>
                    <Typography variant="body2">{user.mobile}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VotingDashboard;
