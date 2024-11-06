import express from "express";
import { loginUser, registerUser } from "../routControler/manulaAuthUser.js";
import authMiddleware from '../middleware/authMiddleware.js';

const route = express.Router();

route.post('/register',registerUser)

route.post('/login', loginUser);

route.get('/protected-route', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You have access to this route.' });
});


export default route;