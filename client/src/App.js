import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenu = useCallback(async (week) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/menu/${week}`);
      // Ensure days are sorted if not guaranteed by API (e.g., Sunday first)
      const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const sortedData = response.data.sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day));
      setMenuData(sortedData);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError(err.response?.data?.message || 'Failed to fetch menu data. Please try again later.');
      setMenuData([]); // Clear data on error
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMenu(selectedWeek);
  }, [selectedWeek, fetchMenu]);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading menu...</Typography>
        </Box>
      );
    }

    if (error) {
      return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
    }

    if (menuData.length === 0) {
      return <Alert severity="info" sx={{ mt: 4 }}>No menu data available for Week {selectedWeek}.</Alert>;
    }

    return (
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {days.map((day) => {
          const dayMenu = menuData.find((menu) => menu.day === day);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="div" gutterBottom color="primary.main" sx={{ fontWeight: 'bold' }}>
                  {day}
                </Typography>
                {mealTypes.map((mealType) => {
                  const mealDescription = dayMenu?.meals?.[mealType] || 'Not set';
                  return (
                    <Card key={mealType} sx={{ mb: 1, flexGrow: 1}} variant="outlined">
                      <CardContent sx={{ p:1.5 }}>
                        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium', textTransform: 'capitalize' }}>
                          {mealType}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {mealDescription}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <RestaurantMenuIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weekly Meal Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <FormControl sx={{ minWidth: 240 }} variant="outlined">
              <InputLabel id="week-select-label">Select Week</InputLabel>
              <Select
                labelId="week-select-label"
                value={selectedWeek}
                label="Select Week"
                onChange={(e) => setSelectedWeek(e.target.value)}
              >
                {[1, 2, 3, 4].map((week) => (
                  <MenuItem key={week} value={week}>
                    Week {week}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {renderContent()}
        </Paper>
      </Container>
    </Box>
  );
}

export default App; 