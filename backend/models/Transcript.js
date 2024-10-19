const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
    text: String,
    summary: String,
    actionItems: [String],
});

module.exports = mongoose.model('Transcript', TranscriptSchema);
