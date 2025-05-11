# Meal Menu Planner

**Live Website:** (https://your-app-url.com) *(dummy link)*

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) to manage and display weekly meal menus. Features dynamic menu selection, comprehensive meal coverage (Breakfast, Lunch, Snacks, Dinner), a user-friendly Material-UI interface, and a RESTful API.

## Tech Stack

- **Frontend:** React, Material-UI, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose)

## Getting Started

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/maheswar2003/meal-menu-planner.git
    cd meal-menu-planner
    ```

2.  **Backend Setup:**
    - Create `.env` from `.env.example` and add your MongoDB URI and port.
    - Install dependencies: `npm install`

3.  **Frontend Setup:**
    - Navigate to `client`: `cd client`
    - Install dependencies: `npm install`
    - Go back to the root: `cd ..`

## Running Locally

1.  **Start Backend:** `npm run dev` (from project root)
2.  **Start Frontend:** `npm start --prefix client` (from project root) or `cd client && npm start`

## Populating Data

Use `curl` to bulk upload menu data from `all-weeks-menu.json`:

```bash
curl -X POST http://localhost:5000/api/menu/bulk \
-H "Content-Type: application/json" \
-d @all-weeks-menu.json
```

## API Endpoints

- `GET /api/menu/:week`: Get menu for a specific week.
- `POST /api/menu/bulk`: Add multiple menu items.

## Deployment

Configured for Render. Set the following environment variables:

- `MONGODB_URI`: Your production MongoDB connection string.
- `NODE_ENV`: `production`
- `REACT_APP_API_URL`: `/api`

**Build Command:** `npm run build`
**Start Command:** `npm start`

## Contributing

Pull requests are welcome.

## License

MIT License (see `LICENSE` file).
