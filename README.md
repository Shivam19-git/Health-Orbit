# Health Orbit - Fitness & Wellness Platform

Health Orbit is a comprehensive fitness and wellness application that connects users with certified coaches, personalized workout plans, and nutrition guidance. The platform offers a seamless experience for users to track their fitness journey and for coaches to provide professional guidance.

---

## Features

### User Features
- Secure authentication with login and registration
- BMI Calculator for body mass index assessment and personalized recommendations
- Workout tracking with customizable plans
- Nutrition logging and meal planning
- Progress monitoring with visual charts and metrics
- Personal coach selection from verified fitness professionals

### Coach Features
- Coach registration with certificate verification
- Client management system
- Customized workout plan creation for clients
- Progress tracking for all clients

### Admin Features
- Coach approval system to verify credentials
- User and coach management
- Content management for workouts and nutrition plans

---

## Technology Stack

### Frontend
- **React** with Vite for fast development
- **TailwindCSS** for modern, responsive UI
- **React Router** for seamless navigation
- **Axios** for API communication

### Backend
- **Node.js** with Express.js for robust API
- **MongoDB** for flexible data storage
- **JWT** for secure authentication
- **Cloudinary** for image storage and management
- **Mongoose** for database modeling

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

#### Clone the Repository
```sh
git clone https://github.com/yourusername/health-orbit.git
cd health-orbit
```

#### Backend Setup
```sh
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
PORT=6060
MONGODB_URI=mongodb://localhost:27017/healthorbit
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Start the backend server:
```sh
npm start
```

#### Frontend Setup
```sh
cd ../frontend
npm install
```

Create a `.env` file with API configuration in the frontend directory:
```env
BACKEND_API_URL=http://localhost:6060/api
```
Start the development server:
```sh
npm run dev
```

---

## Project Structure
```
health-orbit/
├── backend/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Authentication and validation middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── frontend/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── APIs/       # API service functions
│   │   ├── assets/     # Images and static resources
│   │   ├── Components/ # Reusable UI components
│   │   ├── Pages/      # Page components
│   │   └── main.jsx    # Entry point
│   └── index.html      # HTML template
└── README.md           # Project documentation
```

---

## Key Features in Detail

### BMI Calculator
Users can calculate their Body Mass Index (BMI) and receive personalized recommendations based on their results, including nutrition and exercise guidance.

### Coach Certification
Coaches must provide certification documents, which are reviewed by admins before approval, ensuring all fitness guidance comes from qualified professionals.

### Personalized Workout Plans
Coaches can create custom workout plans for users based on their fitness level, goals, and preferences.

---

## Contributing
We welcome contributions! Follow these steps:
1. Fork the repository
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make changes and commit:
   ```sh
   git commit -am 'Add new feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature-branch
   ```
5. Create a new Pull Request

---

## License
This project is licensed under the **MIT License**.

---

© 2025 Health Orbit. All rights reserved.

