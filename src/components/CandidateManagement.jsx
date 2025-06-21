import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Grid,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Add, Delete, Person } from '@mui/icons-material';
import API from '../api';

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    party: '',
    symbol: '',
    description: '',
  });

  // ✅ Fetch candidates from backend
  const fetchCandidates = async () => {
    try {
      const response = await API.get('/api/candidates');
      setCandidates(response.data);
    } catch (err) {
      alert('Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // ✅ Add candidate
  const handleAddCandidate = async () => {
    if (!newCandidate.name || !newCandidate.party || !newCandidate.symbol) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await API.post('/api/candidates', newCandidate);
      setCandidates([...candidates, response.data]);
      setNewCandidate({ name: '', party: '', symbol: '', description: '' });
      alert(`${response.data.name} has been added to the ballot`);
    } catch (err) {
      alert('Failed to add candidate');
    }
  };

  // ✅ Remove candidate
  const handleRemoveCandidate = async (id) => {
    try {
      await API.delete(`/api/candidates/${id}`);
      setCandidates(candidates.filter((c) => c._id !== id));
      alert('Candidate removed');
    } catch (err) {
      alert('Failed to remove candidate');
    }
  };

  const handleInputChange = (field) => (e) =>
    setNewCandidate({ ...newCandidate, [field]: e.target.value });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Candidate
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Candidate Name *" value={newCandidate.name} onChange={handleInputChange('name')} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Party *" value={newCandidate.party} onChange={handleInputChange('party')} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Symbol *" value={newCandidate.symbol} onChange={handleInputChange('symbol')} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Description" value={newCandidate.description} onChange={handleInputChange('description')} />
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" startIcon={<Add />} onClick={handleAddCandidate}>
            Add Candidate
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Candidates ({candidates.length})
          </Typography>

          {loading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : candidates.length === 0 ? (
            <Alert severity="info">No candidates added yet.</Alert>
          ) : (
            candidates.map((candidate) => (
              <Card key={candidate._id} variant="outlined" sx={{ my: 1 }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Typography variant="h4">{candidate.symbol}</Typography>
                    <Box>
                      <Typography variant="h6">{candidate.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {candidate.party}
                      </Typography>
                      {candidate.description && (
                        <Typography variant="caption" color="text.secondary">
                          {candidate.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <IconButton color="error" onClick={() => handleRemoveCandidate(candidate._id)}>
                    <Delete />
                  </IconButton>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CandidateManagement;
