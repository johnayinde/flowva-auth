# Flowva Authentication - Setup Guide

This guide will help you set up and run the modular, component-based React application with a Node.js backend for the Flowva authentication system.

## Project Structure

The project is organized as a full-stack application with separate client and server directories:

```
flowva-auth/
├── client/                # React frontend
│   └── ...
└── server/                # Node.js backend
    └── ...
```

## Prerequisites

- Node.js (v14 or higher)
- yarn package manager

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/john-ayinde/flowva-auth.git
cd flowva-auth
```

### Setting Up the Backend

1. Navigate to the server directory:

```bash
cd server
```

2. Install the dependencies:

```bash
yarn install
```

3. Create a `.env` file in the server directory by copying `.env.example`:

```bash
cp .env.example .env
```

4. Edit the `.env` file with your MongoDB connection string, JWT secret, and email settings.

5. Start the backend server:

```bash
# Development mode with auto-reload
yarn run dev
```

The server will start on port 5000 by default (or the port specified in your .env file).

### Setting Up the Frontend

1. Open a new terminal and navigate to the client directory:

```bash
cd client
```

2. Install the dependencies:

```bash
yarn install
```

3. Start the frontend development server:

```bash
yarn start
```

The React development server will start on port 3000 and automatically open in your browser.

## Features

- **User Registration**: Secure signup with email verification
- **User Login**: Authentication with JWT tokens
- **Password Management**: Forgot password and reset flows
- **Google OAuth**: Sign in/sign up with Google account
- **Form Validation**: Client-side validation for all forms
- **Responsive Design**: Mobile-friendly layout
- **Security**: Password hashing, JWT with proper expiration, CSRF protection
- **Email Verification**: Email verification for new accounts

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and return a token
- `GET /api/auth/verify/:token` - Verify email address
- `POST /api/auth/forgot` - Initiate password reset
- `PUT /api/auth/reset/:token` - Complete password reset with token
- `PUT /api/auth/updatepassword` - Update user password
- `POST /api/auth/google` - Google OAuth login

## Environment Variables

### Server

See the `.env.example` file for all required variables.

## Security Considerations

- The JWT secret should be a long, random string
- In production, enable HTTPS for all connections
- Set appropriate CORS settings in the server for your domains
- Keep MongoDB credentials secure
- Use secure cookies for token storage

## Troubleshooting

### Common Issues

1. **MongoDB Connection Errors**:

   - Check your MongoDB URI
   - Ensure your IP is whitelisted if using Atlas

2. **Email Sending Failures**:

   - Verify SMTP credentials
   - Check for proper email format

3. **JWT Authentication Failures**:

   - Ensure JWT_SECRET matches in all environments
   - Verify token expiration settings

4. **CORS Errors**:
   - Check your CORS configuration in the server
   - Ensure you're using the right origin URLs

## Performance Optimization

1. **Server-Side**:

   - Implement caching for common requests
   - Use pagination for large data sets
   - Consider database indexing for frequent queries

2. **Client-Side**:
   - Implement lazy loading for components
   - Optimize bundle size
   - Use memoization for expensive computations
