const express = require('express');
const Transcript = require('../models/Transcript');
const router = express.Router();

// Post transcript
router.post('/', async (req, res) => {
    const { text, summary, actionItems } = req.body;
    const transcript = new Transcript({ text, summary, actionItems });
    await transcript.save();
    res.status(201).json(transcript);
});

// Get all transcripts
router.get('/', async (req, res) => {
    const transcripts = await Transcript.find();
    res.json(transcripts);
});

module.exports = router;
