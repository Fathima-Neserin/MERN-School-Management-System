# MERN School Management System

## Project Description

The School Management System is a web application designed to facilitate the management of student details, library history, and fees history across various classes within a school. The system implements Role-Based Access Control (RBAC) to ensure that users can only access features relevant to their roles: School Admin, Office Staff, and Librarian.

## Features

- **User Authentication**: Secure login for different roles.
- **CRUD Operations**: Manage student details, library history, and fees history.
- **Role-Based Access Control**: Different access levels for Admin, Office Staff, and Librarians.
- **Confirmation Dialogs**: Prevent accidental deletions or modifications.

## Tech Stack

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: Redux for global state management

## Setup Instructions

### Prerequisites

- Node.js 
- MongoDB Atlas
- Git

### Backend Setup

1. Clone the repository:


   git clone https://github.com/Fathima-Neserin/MERN-School-Management-System.git
   cd backend
    

2. Install dependencies:

    npm install
    
3. Create a `.env` file in the server directory with the following environment variables:

    
    PORT=3001
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    

4. Start the server:

    npm start    

### Backend Setup

1. Navigate to the frontend directory:

    
    cd frontend
    

2. Install dependencies:


    npm install
    

4. Start the React application:


    npm start
    


## List of Used Libraries

### Backend Libraries

- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs

### Frontend Libraries

- react
- react-dom
- react-router-dom
- redux
- axios