# Fitness App Backend

This is the backend service for the Fitness App, which provides APIs for user management, workout tracking, and nutrition logging.

## Features

- User authentication and authorization
- Workout tracking
- Nutrition logging
- Progress monitoring

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/fitnessApp0-backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd fitnessApp0-backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/fitnessApp
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. Start the server:
    ```bash
    npm start
    ```

2. The server will be running on `http://localhost:3000`.

## API Documentation

API documentation is available at `http://localhost:3000/api-docs` when the server is running.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
