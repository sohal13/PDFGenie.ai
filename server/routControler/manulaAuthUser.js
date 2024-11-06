import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../schema/UserSchema.js';
import jwt from 'jsonwebtoken';

// Registration Validation
const validateRegister = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

// Register Function
export const registerUser = async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, email, password } = req.body;

    try {
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: 'Registration successful!' });
    } catch (err) {
        res.status(500).json({ error: 'Server error, please try again later.' });
    }
};

// Login Validation
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

// Login Function
export const loginUser = async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });


        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' });

        // Remove the password manually
        user.password = undefined;  // This removes the password field
        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.SESSION_SECRET, { expiresIn: '90d' });

        console.log(user);

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            user,
            token, // Return the token in response
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error, please try again later.' });
    }
};
