# Fitness App

This project is a fitness application with a frontend built using React and Vite, and a backend built using Node.js, Express, and MongoDB. The application provides user authentication, workout tracking, and nutrition logging.

## Features

- User authentication and authorization
- Workout tracking
- Nutrition logging
- Progress monitoring

## Technologies Used

- Frontend: React, Vite, TailwindCSS
- Backend: Node.js, Express.js, MongoDB, JWT for authentication

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/fitnessApp.git
    ```

2. Navigate to the project directory:
    ```bash
    cd fitnessApp
    ```

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the [`backend`](backend ) directory and add the following environment variables:
    ```env
    PORT=5000
    DB_CONNECTION_STRING=mongodb://localhost:27017/fitnessApp
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

### Running the Application

1. Ensure that both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Documentation

API documentation is available at `http://localhost:5000/api-docs` when the backend server is running.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.