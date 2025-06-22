// routes/candidateRoutes.js

const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Get all
router.get('/', async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
});

// Add
router.post('/', async (req, res) => {
  const newCandidate = new Candidate(req.body);
  const saved = await newCandidate.save();
  res.status(201).json(saved);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
