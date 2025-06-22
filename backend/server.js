const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://care-eco-beta.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes
const candidateRoutes = require('./routes/candidates');
const statsRoutes = require('./routes/stats');

app.use('/api/candidates', candidateRoutes);
app.use('/api/stats', statsRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection error:', err));
