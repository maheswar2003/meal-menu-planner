// Sample menu data for Week 1
const week1Menu = [
  {
    week: 1,
    day: "Sunday",
    meals: {
      breakfast: "Idli with Sambar and Chutney",
      lunch: "Jeera Rice with Dal Fry and Roti",
      snacks: "Tea with Biscuits",
      dinner: "Chapati with Mixed Vegetable Curry"
    }
  },
  {
    week: 1,
    day: "Monday",
    meals: {
      breakfast: "Poha with Tea",
      lunch: "Veg Biryani with Raita",
      snacks: "Fruit Salad",
      dinner: "Rice with Sambar and Papad"
    }
  },
  {
    week: 1,
    day: "Tuesday",
    meals: {
      breakfast: "Upma with Chutney",
      lunch: "Rajma Chawal",
      snacks: "Samosa with Tea",
      dinner: "Chapati with Paneer Butter Masala"
    }
  },
  {
    week: 1,
    day: "Wednesday",
    meals: {
      breakfast: "Dosa with Sambar",
      lunch: "Veg Pulao with Curd",
      snacks: "Sandwich",
      dinner: "Rice with Dal and Sabzi"
    }
  },
  {
    week: 1,
    day: "Thursday",
    meals: {
      breakfast: "Paratha with Curd",
      lunch: "Chole Bhature",
      snacks: "Pakora with Tea",
      dinner: "Chapati with Mixed Dal"
    }
  },
  {
    week: 1,
    day: "Friday",
    meals: {
      breakfast: "Bread Butter with Tea",
      lunch: "Veg Fried Rice with Manchurian",
      snacks: "Chips and Juice",
      dinner: "Rice with Sambar and Papad"
    }
  },
  {
    week: 1,
    day: "Saturday",
    meals: {
      breakfast: "Aloo Paratha with Curd",
      lunch: "Veg Thali",
      snacks: "Fruit Chaat",
      dinner: "Chapati with Paneer Curry"
    }
  }
];

// You can add more weeks following the same pattern
// To use this data, you can make a POST request to /api/menu/bulk with this data

module.exports = { week1Menu }; 