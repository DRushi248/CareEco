import { Box, Typography, Paper, Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


export default function OfficerDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    registered: 0,
    voted: 0,
    pending: 0,
  });

  useEffect(() => {
    const officer = JSON.parse(localStorage.getItem('user'));
    if (!officer) {
      navigate('/');
      return;
    }

    // Mock data fetch based on constituency
    const mockStats = {
      registered: 120,
      voted: 75,
    };
    setData({
      ...mockStats,
      pending: mockStats.registered - mockStats.voted,
    });
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Officer Dashboard
        </Typography>

        <IconButton
          color="error"
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/');
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Registered Voters</Typography>
            <Typography variant="h4" color="primary">{data.registered}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">People Voted</Typography>
            <Typography variant="h4" color="success.main">{data.voted}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Pending Voters</Typography>
            <Typography variant="h4" color="warning.main">{data.pending}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
