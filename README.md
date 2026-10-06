# Student Management System

## Project Overview

The Student Management System is a simple web application developed using Node.js, Express.js, MongoDB, Mongoose, and EJS.

The system allows users to manage student records through a web interface.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* MongoDB Compass
* Mongoose
* EJS
* Express Session
* HTML
* CSS

## Features

* User Login
* Session Management
* Login Protection Middleware
* Add Student
* View Student Records
* Update Student Information
* Delete Student Information
* MongoDB Data Storage
* CRUD Operations

## Database

Database Name:

`student_management`

Collection Name:

`students`

Student information is stored persistently in MongoDB and can be viewed using MongoDB Compass.

## CRUD Operations

The system supports four basic CRUD operations:

* **Create** – Add a new student
* **Read** – View student records
* **Update** – Edit student information
* **Delete** – Delete student information

## Middleware

The project uses Express.js middleware to process requests and protect the student management page.

The login protection middleware checks if the user has an active session before allowing access to the student management page.

## Session Management

The application uses Express Session to manage user login sessions.

After login, the username is stored in the session. The protected student page can only be accessed by a logged-in user.

The logout feature destroys the active session.

## MongoDB

MongoDB is used as the database for storing student records.

Mongoose is used to connect the Express.js application to MongoDB and define the student schema.

## How to Run

Install the project dependencies:

```bash
npm install
```

Make sure MongoDB is running.

Start the Express.js application:

```bash
node app.js
```

Open the browser and visit:

```text
http://localhost:4000
```

## Project Structure

```text
Student Management System
│
├── views
│   ├── index.ejs
│   ├── login.ejs
│   └── students.ejs
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Purpose

This project is created for educational purposes to demonstrate Express.js, MongoDB, CRUD operations, middleware, and session management.

## Author

Jonalyn Gingo
