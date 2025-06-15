const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Fallback menu data from JSON file
let fallbackMenuData = [];
try {
  const rawData = fs.readFileSync('all-weeks-menu.json', 'utf8');
  fallbackMenuData = JSON.parse(rawData);
  console.log(`Loaded ${fallbackMenuData.length} menu items from JSON file as fallback.`);
} catch (error) {
  console.error('Error reading fallback menu data:', error);
}

// MongoDB Connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/meal-menu';
let mongoConnected = false;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  mongoConnected = true;
  console.log('Successfully connected to MongoDB');
}).catch((error) => {
  console.warn('MongoDB connection failed, using fallback JSON data:', error.message);
  mongoConnected = false;
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  mongoConnected = false;
});
db.once('open', () => {
  mongoConnected = true;
  console.log('Successfully connected to MongoDB');
});

// Menu Schema
const menuSchema = new mongoose.Schema({
  week: {
    type: Number,
    required: true,
    min: 1,
    max: 4 // Assuming 4 weeks
  },
  day: {
    type: String,
    required: true,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  meals: {
    breakfast: { type: String, default: 'Not set' },
    lunch: { type: String, default: 'Not set' },
    snacks: { type: String, default: 'Not set' },
    dinner: { type: String, default: 'Not set' }
  }
});

const Menu = mongoose.model('Menu', menuSchema);

// API Root
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to the Meal Menu Planner API!',
    database: mongoConnected ? 'MongoDB Connected' : 'Using JSON Fallback'
  });
});

// Routes
app.get('/api/menu/:week', async (req, res) => {
  try {
    const weekNumber = parseInt(req.params.week, 10);
    if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 4) {
      return res.status(400).json({ message: 'Invalid week number. Must be between 1 and 4.' });
    }

    let menus = [];
    
    if (mongoConnected) {
      // Try to get data from MongoDB
      try {
        menus = await Menu.find({ week: weekNumber });
      } catch (error) {
        console.error('Error fetching from MongoDB, falling back to JSON:', error);
        mongoConnected = false;
      }
    }
    
    // If MongoDB is not connected or no data found, use fallback
    if (!mongoConnected || menus.length === 0) {
      menus = fallbackMenuData.filter(menu => menu.week === weekNumber);
    }
    
    if (!menus || menus.length === 0) {
      return res.status(404).json({ message: `No menu found for week ${weekNumber}.` });
    }
    
    res.json(menus);
  } catch (error) {
    console.error('Error fetching menu by week:', error);
    res.status(500).json({ message: 'Failed to fetch menu data.', error: error.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    if (!mongoConnected) {
      return res.status(503).json({ message: 'Database not available. Cannot create new menu items.' });
    }
    const menu = new Menu(req.body);
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    console.error('Error creating menu item:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed.', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to create menu item.', error: error.message });
  }
});

app.post('/api/menu/bulk', async (req, res) => {
  try {
    const menuData = req.body;
    if (!Array.isArray(menuData) || menuData.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of menu items.' });
    }
    
    if (!mongoConnected) {
      return res.status(503).json({ message: 'Database not available. Cannot bulk import menu items.' });
    }
    
    // Optional: Add more validation for each item in menuData here if needed
    const result = await Menu.insertMany(menuData, { ordered: false }); // ordered:false continues on error
    res.status(201).json({ message: 'Bulk menu items created successfully.', createdCount: result.length, data: result });
  } catch (error) {
    console.error('Error bulk creating menu items:', error);
    if (error.name === 'MongoBulkWriteError' && error.writeErrors) {
        return res.status(400).json({ message: 'Error during bulk insert. Some items may have failed.', errors: error.writeErrors });
    }
    res.status(500).json({ message: 'Failed to bulk create menu items.', error: error.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
}); 