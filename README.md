# User Identity Backend

This project is a backend service for identity reconciliation, built with Koa and Sequelize. It consolidates user identities based on email and phone number to prevent duplicate records.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Migration](#database-migration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Identify User](#identify-user)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ayushhsrivastav/user-identity-backend.git
   cd user-identity-backend
   ```

2. Install dependencies:

   npm install

## Configuration

Update the database configuration in `config/config.json`:

    {
      "development": {
        "dialect": "sqlite",
        "storage": "./dev.sqlite3"
      },
      "test": {
        "dialect": "sqlite",
        "storage": ":memory:"
      },
      "production": {
        "dialect": "sqlite",
        "storage": "./prod.sqlite3"
      }
    }

## Database Migration

Run the database migration to create the necessary tables:

    npx sequelize-cli db:migrate

## Running the Application

To start the application, run:

    node server.js

The server will start on port `3000` by default.

## API Endpoints

### Identify User

- **URL:** `/identify`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "phoneNumber": "1234567890"
  }
  ```

- **Response:**

  ```json
  {
    "contact": {
      "primaryContactId": 1,
      "emails": ["user@example.com"],
      "phoneNumbers": ["1234567890"],
      "secondaryContactIds": []
    }
  }
  ```

## Testing

You can test the `/identify` endpoint using tools like Postman or curl. Here's an example request:

    curl -X POST https://user-identity-backend.onrender.com/identify -H "Content-Type: application/json" -d '{"email":"sample@gmail.com","phoneNumber":"123456"}'

## Deployment

The service is deployed at [https://user-identity-backend.onrender.com](https://user-identity-backend.onrender.com).

## Project Structure

    user-identity/
    │
    ├── config/
    │   └── config.json
    ├── migrations/
    │   └── YYYYMMDDHHMMSS-create-contacts.js
    ├── models/
    │   ├── contact.js
    │   └── index.js
    ├── seeders/
    ├── app/
    │   ├── controllers/
    │   │   └── api.controller.js
    │   ├── services/
    │   │   └── api.service.js
    │   └── routes/
    │       └── api.js
    │
    ├── server.js
    ├── package.json
    └── README.md
