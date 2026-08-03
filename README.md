# AI Airbnb

AI Airbnb is a full-stack vacation rental platform with authentication, property management, bookings, favorites, reviews, payments, and AI-powered trip recommendations. The project combines a React/Vite frontend with an Express/MongoDB backend.

## Features

- User authentication and authorization
- Property browsing, details, and search
- Favorites and bookings
- Host dashboard for managing stays
- Admin dashboard
- AI-based trip recommendations and planning assistance
- Cloudinary image uploads
- Email OTP verification
- Razorpay payment integration

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- Framer Motion
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Cloudinary for image storage
- OpenAI integration for AI features
- Razorpay for payments
- Nodemailer for email delivery

## Project Structure

```bash
client/       # React frontend
server/       # Express backend
```

## Prerequisites

Make sure you have installed:

- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB instance

## Environment Variables

Create a `.env` file inside the server folder with the following variables:

Example:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai-airbnb
JWT_SECRET=dev-secret
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
AI_API_KEY=your_openai_api_key
AI_BASE_URL=https://api.openai.com/v1
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```


```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

AI_API_KEY=your_openai_api_key
AI_BASE_URL=https://api.openai.com/v1

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd AI_Airbnb
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

## Running the Project

### Start the backend

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`.

### Start the frontend

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`.

## Usage

- Visit the homepage to browse stays
- Register or log in to access protected features
- Use the AI recommendation page for trip suggestions
- Hosts can manage listings from the host dashboard
- Admin users can access admin tools

## Quality Improvements

Recent upgrades include:
- validated auth input for safer signup and login flows
- stronger backend regression tests
- health checks for easier deployment monitoring
- clearer setup and environment documentation

## Deployment Notes

This app can be deployed with a Node.js hosting service for the backend and a static hosting service for the frontend. Make sure your production environment includes the required environment variables and a MongoDB connection.

## Notes

- The frontend expects the backend API at the local server URL.
- Some features such as email sending, AI responses, and payments require valid credentials configured in your environment file.

## License

This project is for educational/demo purposes.
