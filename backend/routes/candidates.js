const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// GET all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// POST a new candidate
router.post('/', async (req, res) => {
  try {
    const { name, party, symbol, description } = req.body;
    const newCandidate = new Candidate({ name, party, symbol, description });
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add candidate' });
  }
});

// DELETE a candidate
router.delete('/:id', async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Candidate removed' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete candidate' });
  }
});

module.exports = router;