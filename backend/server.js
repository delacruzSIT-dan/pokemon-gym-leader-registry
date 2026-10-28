require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

const gymLeaderSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  region: { type: String, required: true, enum: ['Kanto', 'Johto', 'Hoenn'] },
  town: { type: String, required: true },
  badge: { type: String, required: true },
  specialty: { type: String, required: true },
  aceLevel: { type: Number, required: true, min: 1, max: 100 },
  motto: { type: String, maxlength: 150 }
});

const GymLeader = mongoose.model('GymLeader', gymLeaderSchema);


app.get('/api/leaders', async (req, res) => {
  try {
    const leaders = await GymLeader.find();
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching leaders' });
  }
});

app.get('/api/leaders/:id', async (req, res) => {
  try {
    const leader = await GymLeader.findById(req.params.id);
    if (!leader) return res.status(404).json({ error: 'Gym Leader not found' });
    res.json(leader);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

app.post('/api/leaders', async (req, res) => {
  try {
    const newLeader = await GymLeader.create(req.body);
    res.status(201).json(newLeader);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error while creating leader' });
  }
});

app.put('/api/leaders/:id', async (req, res) => {
  try {
    const updatedLeader = await GymLeader.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLeader) return res.status(404).json({ error: 'Gym Leader not found' });
    res.json(updatedLeader);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(400).json({ error: 'Invalid ID or update data' });
  }
});

app.delete('/api/leaders/:id', async (req, res) => {
  try {
    const deletedLeader = await GymLeader.findByIdAndDelete(req.params.id);
    if (!deletedLeader) return res.status(404).json({ error: 'Gym Leader not found' });
    res.json({ message: 'Gym Leader successfully deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
