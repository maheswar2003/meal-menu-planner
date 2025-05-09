# Weekly Meal Menu Planner

**Live Website:** [https://your-app-url.com](https://your-app-url.com) *(Update after deployment)*

A full-stack web application for managing and displaying weekly meal menus, built with the MERN stack (MongoDB, Express, React, Node.js) and Material-UI for a modern interface.

## Features

- **Dynamic Menu Display:** Select from 4 different weeks to view meal plans.
- **Comprehensive Meal Coverage:** Shows Sunday to Saturday, with Breakfast, Lunch, Snacks, and Dinner for each day.
- **User-Friendly Interface:** Modern, responsive UI built with Material-UI, including loading states and error handling.
- **RESTful API Backend:** Robust backend with Express and MongoDB for managing menu data.
- **Data Validation:** Schema validation on the backend to ensure data integrity.
- **Bulk Data Upload:** Endpoint provided to easily populate menu data.

## Tech Stack

- **Frontend:** React, Material-UI, Axios
- **Backend:** Node.js, Express, MongoDB (with Mongoose)
- **Deployment:** Configured for platforms like Render (instructions below).

## Prerequisites

- Node.js (v14 or higher recommended, check `engines` in `package.json`)
- npm (usually comes with Node.js)
- MongoDB (running locally or a MongoDB Atlas account for cloud hosting)

## Getting Started

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/maheswar2003/meal-menu-planner.git
    cd meal-menu-planner
    ```

2.  **Backend Setup:**
    *   Navigate to the project root directory.
    *   Create a `.env` file by copying `.env.example`:
        ```bash
        cp .env.example .env
        ```
    *   Edit the `.env` file and add your MongoDB connection string and other environment variables:
        ```env
        MONGODB_URI=your_mongodb_connection_string
        PORT=5000 # Or your preferred port
        NODE_ENV=development
        ```
    *   Install backend dependencies:
        ```bash
        npm install
        ```

3.  **Frontend Setup:**
    *   Navigate to the `client` directory:
        ```bash
        cd client
        ```
    *   Install frontend dependencies:
        ```bash
        npm install
        ```
    *   (Optional) For local development, the client uses `client/.env` to set `REACT_APP_API_URL=http://localhost:5000/api`. This should be automatically created or you can create it if needed.
    *   Go back to the root directory:
        ```bash
        cd ..
        ```

## Running the Application Locally

1.  **Start the Backend Server (from project root):
    ```bash
    npm run dev
    ```
    The backend will typically run on `http://localhost:5000` (or the port specified in your `.env`).

2.  **Start the Frontend Development Server (from project root, in a new terminal):
    ```bash
    npm start --prefix client
    ```
    Alternatively, navigate to `client` and run `npm start`:
    ```bash
    cd client
    npm start
    ```
    The frontend will typically run on `http://localhost:3000` and connect to the backend API.

## Populating Menu Data

Sample menu data is provided in `all-weeks-menu.json`.

To populate the database (ensure your backend server is running and connected to MongoDB):

Use `curl` (or a tool like Postman):
```bash
curl -X POST http://localhost:5000/api/menu/bulk \
-H "Content-Type: application/json" \
-d @all-weeks-menu.json
```

## API Endpoints

- `GET /api`: Welcome message.
- `GET /api/menu/:week`: Get menu for a specific week (e.g., `/api/menu/1`).
- `POST /api/menu`: Add a single new menu item.
- `POST /api/menu/bulk`: Add multiple menu items from a JSON array.

## Deployment

This application is configured for deployment on platforms like Render.

1.  **Push your code to a GitHub repository.**
2.  **On Render (or similar platform):**
    *   Connect your GitHub repository.
    *   Set the **Build Command** to: `npm run build`
    *   Set the **Start Command** to: `npm start`
    *   **Environment Variables:**
        *   `MONGODB_URI`: Your production MongoDB connection string.
        *   `NODE_ENV`: `production`
        *   `PORT`: (Optional, the platform usually provides one, but you can set it if needed)
        *   `REACT_APP_API_URL`: `/api` (Render will serve the client from the root, and the API will be at `/api` relative to that)
3.  The `package.json` scripts are set up to install dependencies for both backend and frontend and then build the frontend client.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (if you add one, otherwise remove this link or point to `package.json`). 