# Musician Gear Tracker

A comprehensive web application for musicians to track, manage, and maintain their gear inventory. This application helps musicians organize their equipment information, track maintenance schedules, document gear specifications, and protect their investments.

## Features

- **User Authentication System**: Secure account creation and management
- **Gear Inventory Management**: Add, categorize, and track detailed information about instruments and equipment
- **Maintenance Tracker**: Log maintenance activities and set reminders for future maintenance
- **Documentation and Export**: Generate reports and export data for insurance or other purposes
- **Mobile Responsiveness**: Access gear information on any device, anytime, anywhere

## Tech Stack

### Frontend
- React.js
- Material-UI
- Redux for state management
- React Router for navigation
- Formik with Yup for form validation
- Axios for API calls
- React-dropzone for image uploads

### Backend
- Node.js
- Express.js
- JWT for authentication
- MongoDB for database
- Mongoose as ODM
- AWS S3 for image storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- AWS Account (for S3 image storage)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/musician-gear-tracker-app.git
cd musician-gear-tracker-app
```

2. Install dependencies for backend
```bash
cd server
npm install
```

3. Install dependencies for frontend
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name
```

5. Create a `.env` file in the client directory
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend development server
```bash
cd client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
musician-gear-tracker/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── redux/          # Redux state management
│       ├── services/       # API services
│       └── utils/          # Utility functions
│
└── server/                 # Node.js backend
    ├── config/             # Configuration files
    ├── controllers/        # Request handlers
    ├── middleware/         # Custom middleware
    ├── models/             # Database models
    ├── routes/             # API routes
    └── utils/              # Utility functions
```

## API Endpoints

### Authentication
- POST /api/auth/register - Create new user account
- POST /api/auth/login - Authenticate user
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password - Reset password
- GET /api/auth/me - Get current user information

### Gear Management
- GET /api/gear - Get all gear for current user
- POST /api/gear - Add new gear item
- GET /api/gear/:id - Get specific gear item
- PUT /api/gear/:id - Update gear item
- DELETE /api/gear/:id - Delete gear item
- POST /api/gear/:id/images - Upload images for gear

### Maintenance
- GET /api/maintenance/:gearId - Get maintenance records for gear
- POST /api/maintenance - Add maintenance record
- PUT /api/maintenance/:id - Update maintenance record
- DELETE /api/maintenance/:id - Delete maintenance record

### Reminders
- GET /api/reminders - Get all reminders for current user
- POST /api/reminders - Create new reminder
- PUT /api/reminders/:id - Update reminder
- DELETE /api/reminders/:id - Delete reminder
- PUT /api/reminders/:id/complete - Mark reminder as completed

## Security Considerations

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Input validation on both client and server
- Rate limiting for API endpoints
- HTTPS for all communications
- Proper CORS policies

## Future Enhancements

- Mobile app versions (iOS/Android) using React Native
- Bluetooth/GPS tracker integration for physical gear tracking
- Insurance marketplace integration
- Gear value tracking with market data
- Gear lending/sharing system between band members
- Barcode/QR code scanning for quick gear identification

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.