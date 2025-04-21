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
- MongoDB (local or Atlas)
- npm or yarn package manager

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/flowva-auth.git
cd flowva-auth
```

### Setting Up the Backend

1. Navigate to the server directory:

```bash
cd server
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the server directory by copying `.env.example`:

```bash
cp .env.example .env
```

4. Edit the `.env` file with your MongoDB connection string, JWT secret, and email settings.

5. Start the backend server:

```bash
# Development mode with auto-reload
npm run dev

# OR for production
npm start
```

The server will start on port 5000 by default (or the port specified in your .env file).

### Setting Up the Frontend

1. Open a new terminal and navigate to the client directory:

```bash
cd client
```

2. Install the dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
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
- `POST /api/auth/logout` - Invalidate the current token
- `GET /api/auth/me` - Get current user info
- `GET /api/auth/verify/:token` - Verify email address
- `POST /api/auth/forgot` - Initiate password reset
- `PUT /api/auth/reset/:token` - Complete password reset with token
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update user password
- `POST /api/auth/google` - Google OAuth login

## Environment Variables

### Server

See the `.env.example` file for all required variables.

## Production Deployment

### Building the Frontend

```bash
cd client
npm run build
```

This will create a `build` folder in the client directory that contains the optimized production build.

### Deploying the Full Application

The application can be deployed to various hosting platforms:

#### Option 1: Deploying to Heroku

1. Install the Heroku CLI and log in
2. Create a new Heroku app:

```bash
heroku create flowva-auth
```

3. Set up MongoDB:

```bash
heroku addons:create mongodb:sandbox
```

4. Set environment variables:

```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_jwt_secret
# Add other environment variables as needed
```

5. Push to Heroku:

```bash
git push heroku main
```

#### Option 2: Using Docker

1. Create a Dockerfile in the root directory:

```dockerfile
FROM node:14

WORKDIR /app

# Copy and install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy and build client
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client/ ./client/
RUN cd client && npm run build

# Copy server files
COPY server/ ./server/

# Move client build to server's public directory
RUN mkdir -p server/public
RUN cp -r client/build/* server/public/

WORKDIR /app/server

EXPOSE 5000

CMD ["node", "server.js"]
```

2. Build and run the Docker image:

```bash
docker build -t flowva-auth .
docker run -p 5000:5000 --env-file ./server/.env flowva-auth
```

## Security Considerations

- The JWT secret should be a long, random string
- In production, enable HTTPS for all connections
- Set appropriate CORS settings in the server for your domains
- Keep MongoDB credentials secure
- Use secure cookies for token storage
- Implement rate limiting for sensitive routes (already included)

## Extending the Application

### Adding New Features

1. **User Profile Management**:

   - Create new components in the client for profile editing
   - Add new routes and controllers in the server

2. **Role-Based Access Control**:

   - Add role field to the User model
   - Use the authorize middleware for protected routes

3. **Multi-factor Authentication**:
   - Extend the User model with MFA fields
   - Add new routes for MFA setup and verification

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

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
