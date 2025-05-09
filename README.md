# Weekly Meal Menu Planner

**Live Website:** [https://your-app-url.com](https://your-app-url.com)

*Update the above link after deploying your site!*

A full-stack web application for managing and displaying weekly meal menus.

## Features

- Select from 4 different weeks
- View daily meal plans (Sunday to Saturday)
- Display breakfast, lunch, snacks, and dinner for each day
- Modern and responsive UI using Material-UI
- RESTful API backend with MongoDB

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a MongoDB Atlas account)
- npm or yarn package manager

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Create a `.env` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- GET `/api/menu/:week` - Get menu for a specific week
- POST `/api/menu` - Add new menu items

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose 