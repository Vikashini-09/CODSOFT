// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost:27017/jobboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
});

const Job = mongoose.model('Job', JobSchema);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// REST API
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post('/api/jobs', async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.json(newJob);
});

// Embedded frontend (React)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
