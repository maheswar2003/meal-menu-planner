const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meal-menu', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Menu Schema
const menuSchema = new mongoose.Schema({
  week: Number,
  day: String,
  meals: {
    breakfast: String,
    lunch: String,
    snacks: String,
    dinner: String
  }
});

const Menu = mongoose.model('Menu', menuSchema);

// Routes
app.get('/api/menu/:week', async (req, res) => {
  try {
    const menus = await Menu.find({ week: req.params.week });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/menu', async (req, res) => {
  const menu = new Menu(req.body);
  try {
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// New endpoint for bulk menu creation
app.post('/api/menu/bulk', async (req, res) => {
  try {
    const menuData = req.body;
    const result = await Menu.insertMany(menuData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a route to serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 