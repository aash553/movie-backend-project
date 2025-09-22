Movie Backend Project
Overview

The Movie Backend Project is a robust RESTful API built with Node.js, Express, and MongoDB to manage movies, genres, and related operations. It features CRUD operations, authentication & authorization, data validation, and JWT-based secure access. This backend can serve as the foundation for a movie streaming platform, movie review app, or any project requiring movie data management.

Features

RESTful API Endpoints for movies and genres

CRUD Operations: Create, Read, Update, Delete

Authentication & Authorization using JWT

Data Validation to ensure proper input

Secure routes accessible only to authorized users

Error Handling for robust API responses

Ready for Deployment on platforms like Heroku, Render, or Railway

Tech Stack

Backend: Node.js, Express

Database: MongoDB (Mongoose ODM)

Authentication: JWT (JSON Web Token)

Validation: Joi

Version Control: Git & GitHub

Installation & Setup

Clone the repository

git clone https://github.com/aash553/movie-backend-project.git
cd movie-backend-project


Install dependencies

npm install


Setup environment variables
Create a .env file in the root directory and add the following:

PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>


Run the server

npm start


By default, the server runs on http://localhost:5000.

API Endpoints
Authentication

Register a new user

POST /api/users/register
Body: { name, email, password }


Login user

POST /api/users/login
Body: { email, password }
Response: JWT Token

Genres

Get all genres

GET /api/genres


Get a genre by ID

GET /api/genres/:id


Create a new genre

POST /api/genres
Headers: x-auth-token
Body: { name }


Update a genre

PUT /api/genres/:id
Headers: x-auth-token
Body: { name }


Delete a genre

DELETE /api/genres/:id
Headers: x-auth-token

Movies

Get all movies

GET /api/movies


Get a movie by ID

GET /api/movies/:id


Create a new movie

POST /api/movies
Headers: x-auth-token
Body: { title, genreId, numberInStock, dailyRentalRate }


Update a movie

PUT /api/movies/:id
Headers: x-auth-token
Body: { title, genreId, numberInStock, dailyRentalRate }


Delete a movie

DELETE /api/movies/:id
Headers: x-auth-token

Data Validation

Uses Joi for validating request bodies

Ensures required fields are present

Validates types (string, number, etc.) and constraints

Security

JWT Authentication: Protects sensitive routes

Role-based access control can be extended

Input validation to prevent bad data

Project Structure
movie-backend-project/
│
├─ models/          # Mongoose schemas (User, Movie, Genre)
├─ routes/          # API routes (users, movies, genres)
├─ middleware/      # Auth, error handling, validation
├─ controllers/     # Route controllers (optional if structured)
├─ index.js         # Server entry point
├─ package.json     # Dependencies & scripts
├─ .env             # Environment variables
├─ README.md        # Project documentation

Running Tests

If you have added Jest or any testing framework, include instructions here.
Example:

npm test

Deployment

You can deploy this backend to Heroku, Render, or Railway:

# Example for Heroku
heroku create
git push heroku main
heroku config:set MONGO_URI=<your_mongo_uri>
heroku config:set JWT_SECRET=<your_jwt_secret>
heroku open

Contributing

Fork the repository

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Description"

Push to the branch: git push origin feature-name

Open a Pull Request

License

MIT License © Aashish L
