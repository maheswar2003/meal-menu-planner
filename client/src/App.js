import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import axios from 'axios';

function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/menu/${selectedWeek}`);
        setMenuData(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenu();
  }, [selectedWeek]);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Weekly Meal Menu
        </Typography>

        <FormControl sx={{ minWidth: 200, mb: 4 }}>
          <InputLabel>Select Week</InputLabel>
          <Select
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

        <Grid container spacing={3}>
          {days.map((day) => {
            const dayMenu = menuData.find((menu) => menu.day === day) || {
              meals: { breakfast: '', lunch: '', snacks: '', dinner: '' },
            };

            return (
              <Grid item xs={12} md={6} lg={4} key={day}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {day}
                  </Typography>
                  {mealTypes.map((mealType) => (
                    <Card key={mealType} sx={{ mb: 1 }}>
                      <CardContent>
                        <Typography variant="subtitle1" color="primary">
                          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                        </Typography>
                        <Typography variant="body2">
                          {dayMenu.meals[mealType] || 'No menu set'}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}

export default App; 