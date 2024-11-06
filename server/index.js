import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session"; // Use express-session for better session management
import passport from "passport";
import passportSetup from './auth/passport.js';
import googleRoutes from './routes/auth.js';
import authRoutes from './routes/mnualAuth.js'
import mongoose from "mongoose";
dotenv.config();

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Set up CORS
const allowedOrigins = ['http://localhost:5173']; // Frontend URL
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials to be included
}));

// Set up session management
app.use(session({
    secret: process.env.SESSION_SECRET, // Use a secure secret
    resave: false, // Prevent resaving sessions that are not modified
    saveUninitialized: false, // Only save initialized sessions
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 30 * 3, // Session duration
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Auth routes
app.use('/api/v1/auth', googleRoutes);
app.use('/api/v1/manualauth', authRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message,
    });
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(`MongoDB connection error: ${err}`));
    console.log(`Server running on http://localhost:${PORT}`);
});
