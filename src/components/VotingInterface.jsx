import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { ArrowBack, HowToVote, CheckCircle } from '@mui/icons-material';


const VotingInterface = ({ user, onVoteSubmitted, onBack }) => {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const candidates = [
    {
      id: 'candidate1',
      name: 'Rajesh Kumar',
      party: 'Democratic Party',
      symbol: '🌺',
      description: 'Focus on education and healthcare reforms',
    },
    {
      id: 'candidate2',
      name: 'Priya Sharma',
      party: 'Progressive Alliance',
      symbol: '🏠',
      description: 'Infrastructure development and job creation',
    },
    {
      id: 'candidate3',
      name: 'Mohammed Ali',
      party: 'Unity Party',
      symbol: '⭐',
      description: 'Youth empowerment and technology advancement',
    },
    {
      id: 'candidate4',
      name: 'Sunita Patel',
      party: 'Green Party',
      symbol: '🌱',
      description: 'Environmental protection and sustainable development',
    },
    {
      id: 'nota',
      name: 'None of the Above',
      party: 'NOTA',
      symbol: '❌',
      description: 'If you do not support any candidate',
    },
  ];

  const handleVoteSubmit = () => {
    if (!selectedCandidate) {
      alert('Please select a candidate before submitting your vote');
      return;
    }
    setConfirmDialogOpen(true);
  };

  const handleConfirmVote = () => {
    setConfirmDialogOpen(false);
    onVoteSubmitted();
  };

  const selectedCandidateData = candidates.find(c => c.id === selectedCandidate);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
        <Toolbar>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <HowToVote />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Voting Interface
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.constituency} - {user.name}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Cast Your Vote
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Select your preferred candidate by clicking on their name
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Important:</strong> You can vote for only one candidate. Once submitted, your vote cannot be changed.
              </Typography>
            </Alert>

            <RadioGroup
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {candidates.map((candidate) => (
                  <Card
                    key={candidate.id}
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      border: selectedCandidate === candidate.id ? '2px solid' : '1px solid',
                      borderColor: selectedCandidate === candidate.id ? 'primary.main' : 'divider',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 1,
                      },
                    }}
                    onClick={() => setSelectedCandidate(candidate.id)}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                      <FormControlLabel
                        value={candidate.id}
                        control={<Radio />}
                        label=""
                        sx={{ mr: 2 }}
                      />
                      <Typography variant="h4" sx={{ mr: 3 }}>
                        {candidate.symbol}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {candidate.name}
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
                          {candidate.party}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {candidate.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </RadioGroup>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<CheckCircle />}
                onClick={handleVoteSubmit}
                disabled={!selectedCandidate}
                sx={{ px: 4, py: 1.5 }}
              >
                Submit Vote
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Your Vote</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You have selected:
          </Typography>
          {selectedCandidateData && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="h4">{selectedCandidateData.symbol}</Typography>
              <Box>
                <Typography variant="h6">{selectedCandidateData.name}</Typography>
                <Typography variant="body2" color="primary">
                  {selectedCandidateData.party}
                </Typography>
              </Box>
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Once submitted, your vote cannot be changed. Are you sure you want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmVote}>
            Confirm Vote
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VotingInterface;