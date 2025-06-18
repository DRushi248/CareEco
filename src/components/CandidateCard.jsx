import { Card, CardContent, Typography, Button } from '@mui/material';

export default function CandidateCard({ candidate, onVote, disabled }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{candidate.name}</Typography>
        <Typography color="text.secondary">{candidate.party}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onVote(candidate.id)}
          disabled={disabled}
          sx={{ mt: 1 }}
        >
          Vote
        </Button>
      </CardContent>
    </Card>
  );
}
