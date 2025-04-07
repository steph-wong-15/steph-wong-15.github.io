const mongoose = require('mongoose');

// Define the schema for the Climb Log
const ClimbLogSchema = new mongoose.Schema({
  date: { type: String, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, required: true },
  notes: { type: String },
});

// Create and export the model
const ClimbLog = mongoose.model('ClimbLog', ClimbLogSchema);
module.exports = ClimbLog;
