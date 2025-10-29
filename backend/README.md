# Agency Backend API

This is the backend API for the Agency application.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add your environment variables
4. Start the server:
   ```bash
   npm start
   ```

## API Routes

- Auth: `/api/auth`
- Admin: `/api/admin`
- Projects: `/api/projects`
- Services: `/api/services`
- Orders: `/api/orders`

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Socket.IO
- JSON Web Tokens
- Google Gemini AI

## Project Structure

```
src/
├── config/         # Configuration files
├── db/            # Database connection
├── middleware/    # Custom middleware
├── models/        # Database models
├── controllers/   # Route controllers
├── routes/        # API routes
├── utils/         # Utility functions
├── services/      # External services
├── app.js         # Express app
└── server.js      # Server entry point
```
