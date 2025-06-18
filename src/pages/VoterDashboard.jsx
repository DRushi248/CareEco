import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Container,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';


export default function VoterDashboard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/');
        setVoted(user.hasVoted); 
        return;
      }

      // Simulate backend fetch
      const mockCandidates = [
        { id: '1', name: 'Alice Singh', party: 'Party A' },
        { id: '2', name: 'Bob Yadav', party: 'Party B' },
      ];
      setCandidates(mockCandidates);
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  const handleVote = async(id) => {
    setVoted(true);
    setSnack(true);


    const user = JSON.parse(localStorage.getItem('user'));
    user.hasVoted = true;
    localStorage.setItem('user', JSON.stringify(user));

    // TODO: send vote to backend
    console.log(`Voted for: ${id}`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Welcome, Voter!
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

      {loading ? (
        <Loader />
      ) : (
        <>
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onVote={handleVote}
              disabled={voted}
            />
          ))}

          <Button
            variant="outlined"
            color="warning"
            fullWidth
            onClick={() => handleVote('NOTA')}
            disabled={voted}
            sx={{ mt: 2 }}
          >
            Vote for NOTA
          </Button>
        </>
      )}

      <Snackbar
        open={snack}
        autoHideDuration={3000}
        message="Vote submitted!"
        onClose={() => setSnack(false)}
      />
    </Container>
  );
}
