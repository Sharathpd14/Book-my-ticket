# Book My Ticket

A simplified Book My Ticket platform with authentication and seat booking.

## Features

- User registration and login
- JWT-based authentication
- Protected seat booking endpoints
- Prevent duplicate seat bookings
- Associate bookings with logged-in users

## Setup

1. Clone the repository and navigate to the project directory.

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Ensure PostgreSQL is running on localhost:5433 with database `sql_class_2_db`.
   - Run the following SQL commands to create tables:
     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL
     );

     CREATE TABLE seats (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255),
       isbooked INT DEFAULT 0,
       user_id INT REFERENCES users(id)
     );

     INSERT INTO seats (isbooked) SELECT 0 FROM generate_series(1, 20);
     ```

4. Set environment variables (optional):
   - `JWT_SECRET`: Secret key for JWT (default: "your-secret-key")
   - `PORT`: Server port (default: 8080)

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user (body: {email, password})
- `POST /auth/login` - Login (body: {email, password})

### Booking
- `GET /seats` - Get all seats
- `GET /booking/seats` - Get all seats (same as above)
- `POST /booking/book` - Book a seat (requires auth, body: {seatId})
- `PUT /:id/:name` - Book a seat (requires auth, legacy endpoint)

## Usage

1. Register a user.
2. Login to get a JWT token.
3. Use the token in the Authorization header as `Bearer <token>` for protected endpoints.
4. Book seats using the protected endpoints.