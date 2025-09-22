# Movie Backend Project

![Node.js](https://img.shields.io/badge/Node.js-v18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-yellow)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.0-brightgreen)
![GitHub Repo](https://img.shields.io/badge/GitHub-MovieBackendProject-blue)
![License](https://img.shields.io/badge/License-MIT-blueviolet)

## Overview

The **Movie Backend Project** is a robust RESTful API built with **Node.js, Express, and MongoDB** to manage movies, genres, and related operations. It features **CRUD operations**, **authentication & authorization**, **data validation**, and **JWT-based secure access**. This backend can serve as the foundation for a movie streaming platform, movie review app, or any project requiring movie data management.

---

## Features

* RESTful API Endpoints for movies and genres
* CRUD Operations: Create, Read, Update, Delete
* Authentication & Authorization using JWT
* Data Validation to ensure proper input
* Secure routes accessible only to authorized users
* Error Handling for robust API responses
* Ready for Deployment on platforms like Heroku, Render, or Railway

---

## Tech Stack

* **Backend**: Node.js, Express
* **Database**: MongoDB (Mongoose ODM)
* **Authentication**: JWT (JSON Web Token)
* **Validation**: Joi
* **Version Control**: Git & GitHub

---

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/aash553/movie-backend-project.git
cd movie-backend-project
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**
   Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

4. **Run the server**

```bash
npm start
```

By default, the server runs on `http://localhost:5000`.

---

## API Reference

### Authentication

#### Register a new user

```http
POST /api/users/register
Body: { name, email, password }
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `name`     | `string` | **Required**. User's name     |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

#### Login user

```http
POST /api/users/login
Body: { email, password }
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

---

### Genres

#### Get all genres

```http
GET /api/genres
```

*No parameters required.*

#### Get a genre by ID

```http
GET /api/genres/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. ID of genre |

#### Create a new genre

```http
POST /api/genres
Headers: x-auth-token
Body: { name }
```

| Parameter      | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `x-auth-token` | `string` | **Required**. JWT auth token    |
| `name`         | `string` | **Required**. Name of the genre |

#### Update a genre

```http
PUT /api/genres/:id
Headers: x-auth-token
Body: { name }
```

| Parameter      | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `id`           | `string` | **Required**. ID of genre        |
| `x-auth-token` | `string` | **Required**. JWT auth token     |
| `name`         | `string` | **Required**. New name for genre |

#### Delete a genre

```http
DELETE /api/genres/:id
Headers: x-auth-token
```

| Parameter      | Type     | Description                  |
| :------------- | :------- | :--------------------------- |
| `id`           | `string` | **Required**. ID of genre    |
| `x-auth-token` | `string` | **Required**. JWT auth token |

---

### Movies

#### Get all movies

```http
GET /api/movies
```

*No parameters required.*

#### Get a movie by ID

```http
GET /api/movies/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. ID of movie |

#### Create a new movie

```http
POST /api/movies
Headers: x-auth-token
Body: { title, genreId, numberInStock, dailyRentalRate }
```

| Parameter         | Type     | Description                     |
| :---------------- | :------- | :------------------------------ |
| `x-auth-token`    | `string` | **Required**. JWT auth token    |
| `title`           | `string` | **Required**. Movie title       |
| `genreId`         | `string` | **Required**. ID of the genre   |
| `numberInStock`   | `number` | **Required**. Stock count       |
| `dailyRentalRate` | `number` | **Required**. Daily rental rate |

#### Update a movie

```http
PUT /api/movies/:id
Headers: x-auth-token
Body: { title, genreId, numberInStock, dailyRentalRate }
```

| Parameter         | Type     | Description                     |
| :---------------- | :------- | :------------------------------ |
| `id`              | `string` | **Required**. ID of movie       |
| `x-auth-token`    | `string` | **Required**. JWT auth token    |
| `title`           | `string` | **Required**. Movie title       |
| `genreId`         | `string` | **Required**. ID of the genre   |
| `numberInStock`   | `number` | **Required**. Stock count       |
| `dailyRentalRate` | `number` | **Required**. Daily rental rate |

#### Delete a movie

```http
DELETE /api/movies/:id
Headers: x-auth-token
```

| Parameter      | Type     | Description                  |
| :------------- | :------- | :--------------------------- |
| `id`           | `string` | **Required**. ID of movie    |
| `x-auth-token` | `string` | **Required**. JWT auth token |

---

## Project Structure

```
movie-backend-project/
│
├─ models/          # Mongoose schemas (User, Movie, Genre)
├─ routes/          # API routes (users, movies, genres)
├─ middleware/      # Auth, error handling, validation
├─ controllers/     # Route controllers (optional)
├─ index.js         # Server entry point
├─ package.json     # Dependencies & scripts
├─ .env             # Environment variables
├─ README.md        # Project documentation
```

---

## Running Tests

> If using Jest or any testing framework:

```bash
npm test
```

---

## Deployment

You can deploy this backend to **Heroku, Render, or Railway**:

```bash
heroku create
git push heroku main
heroku config:set MONGO_URI=<your_mongo_uri>
heroku config:set JWT_SECRET=<your_jwt_secret>
heroku open
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Description"`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

---

## License

MIT License © Aashish L
