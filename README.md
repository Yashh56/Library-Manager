# LibraryManager

LibraryManager is a comprehensive backend system for managing a library's inventory, user transactions, and authentication. Built with Node.js, TypeScript, Express, and Prisma, it provides a robust and scalable solution for handling library operations.

## Features

- User registration and login with JWT authentication
- Role-based access control (Admin and User roles)
- Borrow and return books functionality
- Search for books by title or author
- View all users and their transaction history (Admin only)

## Technologies Used

- Node.js
- TypeScript
- Express
- Prisma (ORM)
- PostgreSQL (Database)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL database
- npm (Node package manager)

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/Yashh56/Library-Manager.git
    cd Library-Manager
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Set up environment variables

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/library"
    JWT_SECRET="your_secure_jwt_secret"
    PORT=3000
    ```

4. Set up the database

    Run the following Prisma commands to set up your database:

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

### Running the Server

1. Compile the TypeScript code

    ```bash
    npx tsc
    ```

2. Start the server

    ```bash
    npm start
    ```

The server will start on the port specified in the `.env` file.

## API Endpoints

### Auth

- **POST /register** - Register a new user

    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **POST /login** - Login a user

    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

### Books

- **POST /books/borrow** - Borrow a book (Authenticated users)

    ```json
    {
      "bookId": "string",
      "borrowDate": "YYYY-MM-DD",
      "dueDate": "YYYY-MM-DD"
    }
    ```

- **POST /books/return** - Return a book (Authenticated users)

    ```json
    {
      "bookId": "string",
      "returnDate": "YYYY-MM-DD"
    }
    ```

- **POST /books/add** - Add a new book (Admin only)

    ```json
    {
      "title": "string",
      "description": "string",
      "author": "string",
      "copiesAvailable": "number"
    }
    ```

- **PUT /books/update/:id** - Update a book (Admin only)

    ```json
    {
      "title": "string",
      "description": "string",
      "author": "string",
      "copiesAvailable": "number"
    }
    ```

- **GET /books/search?title=string&author=string** - Search books by title or author

### Users

- **GET /users** - Get all users and their transactions (Admin only)
- **GET /users/:username** - Get user details by username (Authenticated users)

## Middleware

- `verifyToken` - Middleware to verify JWT token

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, don't hesitate to get in touch with yashsaini18166@gmail.com.
