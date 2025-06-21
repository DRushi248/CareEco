import { useState, useEffect } from 'react';
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
  Tabs,
  Tab,
  Avatar,
  Chip,
} from '@mui/material';
import {
  People,
  HowToVote,
  Schedule,
  Logout,
  Security,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import CandidateManagement from '../components/CandidateManagement';

const OfficerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState({});
  const [votingStats, setVotingStats] = useState({
    totalRegistered: 0,
    totalVoted: 0,
    pending: 0,
    constituency: '',
  });

  const candidateResults = [
    { name: 'Rajesh Kumar', party: 'Democratic Party', votes: 21, percentage: 42 },
    { name: 'Priya Sharma', party: 'Progressive Alliance', votes: 12, percentage: 24 },
    { name: 'Mohammed Ali', party: 'Unity Party', votes: 9, percentage: 18 },
    { name: 'Sunita Patel', party: 'Green Party', votes: 6, percentage: 12 },
    { name: 'NOTA', party: 'None of the Above', votes: 3, percentage: 6 },
  ];


  const chartData = [
    { name: 'Voted', value: votingStats.totalVoted, fill: '#4caf50' },
    { name: 'Pending', value: votingStats.pending, fill: '#ff9800' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
  fetch('http://localhost:5000/api/results/live')
    .then(res => res.json())
    // .then(setCandidateResults)
    .catch(console.error);
}, []);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/');
    } else {
      setUser(storedUser);

      fetch('http://localhost:5000/api/stats/summary')
        .then(res => res.json())
        .then(data => setVotingStats(data))
        .catch(console.error);

    }
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ color, fontWeight: 'bold' }}>
              {value.toLocaleString()}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <Security />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Election Officer Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.constituency}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip icon={<Security />} label={user.name} variant="outlined" />
            <Button variant="outlined" startIcon={<Logout />} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Voting Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time election monitoring and statistics
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            {/* <StatCard title="Registered Voters" value={votingStats.totalRegistered}  icon={<People />} color="primary.main" /> */}
            <StatCard title="Registered Voters" value="100" icon={<People />} color="primary.main" />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <StatCard title="Votes Cast" value={votingStats.totalVoted} icon={<HowToVote />} color="success.main" /> */}
            <StatCard title="Votes Cast" value="51" icon={<HowToVote />} color="success.main" />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <StatCard title="Pending" value={votingStats.pending} icon={<Schedule />} color="warning.main" /> */}
            <StatCard title="Pending" value="49" icon={<Schedule />} color="warning.main" />
          </Grid>
        </Grid>

        <Card>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="fullWidth">
            <Tab label="Voting Statistics" />
            <Tab label="Candidate Management" />
            <Tab label="Live Results" />
          </Tabs>

          <CardContent sx={{ p: 3 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Voting Progress
                </Typography>
                <Grid item xs={12} md={6}>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          // data={chartData}
                          data={[
                          { name: 'Voted', value: 51, fill: '#4caf50' },
                          { name: 'Pending', value: 49, fill: '#ff9800' },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          dataKey="value"
                          isAnimationActive={true}
                        >
                          {/* {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} /> */}
                          {/* ))} */}
                          <Cell fill="#4caf50" />
                          <Cell fill="#ff9800" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      <Typography variant="h6" gutterBottom>
                        Statistics Summary
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: '#4caf50', mr: 2, borderRadius: 1 }} />
                        <Typography>
                          {/* Voted: {((votingStats.totalVoted / votingStats.totalRegistered) * 100).toFixed(1)}% */}
                          Voted: 51%
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: '#ff9800', mr: 2, borderRadius: 1 }} />
                        <Typography>
                          {/* Pending: {((votingStats.pending / votingStats.totalRegistered) * 100).toFixed(1)}% */}
                          Pending: 49%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 1 && <CandidateManagement />}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Live Election Results
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Real-time vote count as ballots are processed
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {candidateResults.map((candidate, index) => (
                    <Card key={index} variant="outlined">
                      <CardContent sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Box>
                            <Typography variant="h6">{candidate.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {candidate.party}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" color="primary">
                              {candidate.votes.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {candidate.percentage}%
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            height: 8,
                            bgcolor: 'grey.200',
                            borderRadius: 1,
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              width: `${candidate.percentage}%`,
                              height: '100%',
                              bgcolor: index === 0 ? 'success.main' : 'primary.main',
                              transition: 'width 0.5s ease',
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default OfficerDashboard;



// import { useState, useEffect } from 'react';
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Tabs,
//   Tab,
//   Avatar,
//   Chip,
// } from '@mui/material';
// import {
//   People,
//   HowToVote,
//   Schedule,
//   Logout,
//   Security,
// } from '@mui/icons-material';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// import { useNavigate } from 'react-router-dom';
// import CandidateManagement from '../components/CandidateManagement';
// import axios from 'axios';

// const OfficerDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(0);
//   const [user, setUser] = useState({});
//   const [votingStats, setVotingStats] = useState({
//     totalRegistered: 0,
//     totalVoted: 0,
//     pending: 0,
//     constituency: '',
//   });

//   const chartData = [
//     { name: 'Voted', value: votingStats.totalVoted, fill: '#4caf50' },
//     { name: 'Pending', value: votingStats.pending, fill: '#ff9800' },
//   ];

//   const fetchStats = async (constituency) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/stats/${constituency}`);
//       setVotingStats(res.data);
//     } catch (error) {
//       console.error('Failed to fetch voting stats', error);
//     }
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (!storedUser) {
//       navigate('/');
//     } else {
//       setUser(storedUser);
//       fetchStats(storedUser.constituency);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   const StatCard = ({ title, value, icon, color }) => (
//     <Card sx={{ height: '100%' }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Box>
//             <Typography color="text.secondary" variant="body2" gutterBottom>
//               {title}
//             </Typography>
//             <Typography variant="h4" sx={{ color, fontWeight: 'bold' }}>
//               {value.toLocaleString()}
//             </Typography>
//           </Box>
//           <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
//             {icon}
//           </Avatar>
//         </Box>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
//       <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
//         <Toolbar>
//           <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//             <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
//               <Security />
//             </Avatar>
//             <Box>
//               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//                 Election Officer Dashboard
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {user.constituency}
//               </Typography>
//             </Box>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Chip icon={<Security />} label={user.name} variant="outlined" />
//             <Button variant="outlined" startIcon={<Logout />} onClick={handleLogout}>
//               Logout
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h4" gutterBottom>
//             Voting Overview
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Real-time election monitoring and statistics
//           </Typography>
//         </Box>

//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} md={4}>
//             <StatCard title="Registered Voters" value="100" icon={<People />} color="primary.main" />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <StatCard title="Votes Cast" value="51" icon={<HowToVote />} color="success.main" />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <StatCard title="Pending" value="49" icon={<Schedule />} color="warning.main" />
//           </Grid>
//         </Grid>

//         <Card>
//           <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="fullWidth">
//             <Tab label="Voting Statistics" />
//             <Tab label="Candidate Management" />
//             <Tab label="Live Results" />
//           </Tabs>

//           <CardContent sx={{ p: 3 }}>
//             {activeTab === 0 && (
//               <Box>
//                 <Typography variant="h6" gutterBottom>
//                   Voting Progress
//                 </Typography>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={6}>
//                     <Box sx={{ height: 300 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                           <Pie
//                             data={chartData}
//                             cx="50%"
//                             cy="50%"
//                             innerRadius={60}
//                             outerRadius={120}
//                             dataKey="value"
//                           >
//                             {chartData.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={entry.fill} />
//                             ))}
//                           </Pie>
//                           <Tooltip />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
//                       <Typography variant="h6" gutterBottom>
//                         Statistics Summary
//                       </Typography>
//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                         <Box sx={{ width: 20, height: 20, bgcolor: '#4caf50', mr: 2, borderRadius: 1 }} />
//                         <Typography>
//                           {/* Voted: {((votingStats.totalVoted / votingStats.totalRegistered) * 100).toFixed(1)}% */}
//                           Voted: 51%
//                         </Typography>
//                       </Box>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Box sx={{ width: 20, height: 20, bgcolor: '#ff9800', mr: 2, borderRadius: 1 }} />
//                         <Typography>
//                           {/* Pending: {((votingStats.pending / votingStats.totalRegistered) * 100).toFixed(1)}% */}
//                           Pending: 49%
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Box>
//             )}

//             {activeTab === 1 && <CandidateManagement />}
//             {activeTab === 2 && <div>Live Results Placeholder</div>}
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

// export default OfficerDashboard;
