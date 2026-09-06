# 🏠 AI Airbnb

> A full-stack vacation rental platform with AI-powered travel recommendations, property management, bookings, payments, authentication, and role-based dashboards.

AI Airbnb is a production-style vacation rental application built with **React, Node.js, Express, and MongoDB**. The platform supports multiple user roles and integrates external services for **AI recommendations, payments, image storage, and email verification**.

## 🚀 Live Demo

🌐 **Live Application:** https://ai-airbnb-sand.vercel.app/

---

## 📸 Screenshots

> Add your application screenshots to the `screenshots/` folder and update the paths below.

### 🏠 Home & Property Search

![Home and Property Search](./screenshots/home.png)

### 🏡 Property Details

![Property Details](./screenshots/property-details.png)

### 🤖 AI Travel Recommendations

![AI Travel Recommendations](./screenshots/ai-recommendations.png)

### 📅 Booking & Payments

![Booking and Payments](./screenshots/booking.png)

### 👨‍💼 Host Dashboard

![Host Dashboard](./screenshots/host-dashboard.png)

### 🛠️ Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

---

## ✨ Features

### 👤 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Role-based authorization
- Email OTP verification
- Protected routes and resources

### 🏡 Property Management

- Browse available properties
- Property details and search
- Host property management
- Image uploads using Cloudinary
- Property management through the host dashboard

### 📅 Bookings

- Create and manage bookings
- Booking workflows
- Favorites
- Reviews
- Availability-aware booking flow

### 💳 Payments

- Razorpay payment integration
- Payment-related booking workflows
- Secure server-side payment configuration

### 🤖 AI Features

- AI-powered trip recommendations
- Personalized travel suggestions
- AI-assisted trip planning
- OpenAI API integration

### 👨‍💼 Dashboards

- Host dashboard for managing properties and stays
- Admin dashboard for administrative operations
- Protected dashboard access based on user roles

---

## 🧰 Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Axios
- Framer Motion
- Tailwind CSS

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- Role-Based Access Control (RBAC)
- MongoDB
- Mongoose

### Integrations & Services

- OpenAI API — AI-powered recommendations
- Razorpay — Payments
- Cloudinary — Image storage
- Nodemailer — Email delivery

### Development Tools

- Git
- GitHub
- npm
- Postman

---

## 🏗️ Architecture

The application follows a client-server architecture:

```text
┌───────────────────────────┐
│       React Frontend      │
│                           │
│ React + Vite + Tailwind   │
│ React Router + Axios      │
└─────────────┬─────────────┘
              │
              │ REST API
              ▼
┌───────────────────────────┐
│      Express Backend      │
│                           │
│ Node.js + Express         │
│ JWT + RBAC                │
│ Business Logic            │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│         MongoDB           │
│      Mongoose ODM         │
└───────────────────────────┘

External Services
│
├── OpenAI      → AI recommendations
├── Razorpay    → Payments
├── Cloudinary  → Image storage
└── Nodemailer  → Email delivery
```

---

## 🤖 AI Recommendation Flow

The AI recommendation feature connects the application backend with an LLM API.

```text
User preferences
       │
       ▼
React Frontend
       │
       ▼
Express REST API
       │
       ▼
AI Integration
       │
       ▼
OpenAI API
       │
       ▼
AI-generated recommendations
       │
       ▼
React UI
```

The AI functionality is designed to provide users with personalized travel recommendations and trip-planning assistance.

---

## 🔐 Authentication & Authorization

The application uses JWT-based authentication and role-based authorization.

```text
User
 │
 ├── Register / Login
 │
 ▼
JWT Authentication
 │
 ▼
Protected API Routes
 │
 ▼
Role-Based Authorization
 │
 ├── User
 ├── Host
 └── Admin
```

Protected resources and dashboard functionality are restricted based on the authenticated user's role.

---

## 📁 Project Structure

```text
AI_Airbnb/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── package.json
│
├── screenshots/
│   ├── home.png
│   ├── property-details.png
│   ├── ai-recommendations.png
│   ├── booking.png
│   └── host-dashboard.png
│
├── .gitignore
└── README.md
```

> Update the folder structure above if your actual project structure differs.

---

## ⚙️ Prerequisites

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn
- MongoDB
- OpenAI API credentials
- Cloudinary credentials
- Razorpay credentials
- Email credentials for OTP/email functionality

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

```env
NODE_ENV=development

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

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

### ⚠️ Security

Never commit your real `.env` file or API keys to GitHub.

Use placeholder values in documentation and keep secrets in environment variables.

---

## 📥 Installation

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

### 4. Configure environment variables

Create the `.env` file inside the `server` directory and add the required credentials.

---

## ▶️ Running the Project

The frontend and backend need to run separately.

### Start the backend

```bash
cd server
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🧪 API Development

The backend exposes REST APIs for application functionality including:

- Authentication
- Users
- Properties
- Bookings
- Favorites
- Reviews
- Host operations
- Admin operations
- AI functionality
- Payments

API endpoints can be tested using tools such as Postman.

---

## 🛡️ Security & Validation

The application includes several backend protections and validation improvements:

- JWT-based authentication
- Role-based authorization
- Protected API routes
- Authentication input validation
- Environment-based secret configuration
- Server-side API integrations
- Health checks for deployment monitoring

---

## 🧪 Quality Improvements

Recent improvements include:

- Improved authentication input validation
- Stronger backend regression testing
- Health checks for deployment monitoring
- Improved environment/setup documentation
- Bug fixes across application workflows

---

## 🌐 Deployment

The application is designed to use:

```text
Frontend
   │
   ▼
Static/Web Hosting
   │
   │ REST API
   ▼
Node.js / Express Backend
   │
   ├── MongoDB
   ├── Cloudinary
   ├── OpenAI
   ├── Razorpay
   └── Nodemailer
```

The production environment requires the appropriate environment variables and a MongoDB connection.

---

## 🧑‍💻 Usage

### For Users

1. Visit the application
2. Create an account or log in
3. Browse available properties
4. Search for stays
5. Save favorite properties
6. Make bookings
7. Complete payments
8. Use AI-powered travel recommendations
9. Leave reviews

### For Hosts

1. Access the host dashboard
2. Manage properties/stays
3. Manage booking-related workflows

### For Admins

1. Access the protected admin dashboard
2. Manage administrative operations

---

## 💡 Engineering Highlights

This project demonstrates practical full-stack development across several areas:

- Building a React-based frontend
- Designing REST APIs with Node.js and Express
- MongoDB data modeling with Mongoose
- JWT authentication and RBAC
- Protected frontend and backend routes
- Third-party API integrations
- Payment integration
- Cloud-based image storage
- Email/OTP workflows
- AI/LLM API integration
- Deployment and production configuration
- Backend validation and regression testing

---

## 🔮 Future Improvements

Potential improvements for future versions:

- Advanced property filtering
- Improved AI recommendation personalization
- More comprehensive automated testing
- Better booking availability handling
- Improved observability and monitoring
- Enhanced admin analytics
- Performance optimization
- Expanded API documentation

---

## 📌 Important Notes

- The frontend expects the backend API to be available at the configured API URL.
- AI functionality requires valid AI API credentials.
- Payment functionality requires valid Razorpay credentials.
- Email/OTP functionality requires valid email credentials.
- Image uploads require valid Cloudinary credentials.
- Do not expose API keys or other secrets in the repository.

---

## 📄 License

This project is for educational and demonstration purposes.

---

## 👨‍💻 Author

**TOSEEB**

- GitHub: https://github.com/TOSEEB
- Project: https://github.com/TOSEEB/AI_Airbnb
- Live Demo: https://ai-airbnb-sand.vercel.app/
