# POS System Backend

This is a full-stack application for managing products and orders. It includes a backend built with Node.js, Express, and MongoDB, a web frontend using React, and a mobile app using React Native.

## Features

- Create, read, and manage products
- Create and track orders with timestamps
- RESTful API for backend communication
- React-based web admin dashboard
- React Native mobile app for on-the-go management

## Technologies Used

- **Frontend Web:** React, Axios, RTK query, Chakra UI
- **Mobile App:** React Native, Expo, React Navigation, Axios, Redux toolkit, RTK query React Native Paper
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Tools:** Git, Postman, ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or cloud like MongoDB Atlas)
- Expo CLI (for React Native)
- Git

### Backend Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/Shady-Hakim/POS.git
    cd your-repo-name
    ```

2.  Install backend dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file and add your MongoDB URI:

    ```env
    MONGO_URI=your-mongodb-uri
    ```

4.  Start the backend server:

    ```bash
    npm run dev
    ```

### Frontend Web Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm run dev
   ```

### Mobile App Setup (React Native)

1. Navigate to the `mobileApp` directory:

   ```bash
   cd ../mobileApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the mobile app using Expo:

   ```bash
   npx expo start
   ```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get product by id
- `PUT /api/products/:id` - Update product by id

### Orders

- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order by id
- `put /api/orders/:id` - Update order by id
