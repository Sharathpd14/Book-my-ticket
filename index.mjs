// Database setup:
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL
// );
// CREATE TABLE seats (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255),
//   isbooked INT DEFAULT 0,
//   user_id INT REFERENCES users(id)
// );
// INSERT INTO seats (isbooked) SELECT 0 FROM generate_series(1, 20);

import app from "./src/app.js";

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Server starting on port: " + port));
