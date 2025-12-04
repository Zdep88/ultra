import errorHandler from "../errorHandler.js";
import { User } from '../models/sequelize.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const usersController = {
    login: async (req, res) => {
        if (!req.body) {
            errorHandler.throwError(400, "Request body is missing");
        }
        if (!req.body.name || !req.body.password) {
            errorHandler.throwError(400, "Missing required fields: name and password");
        }
        const user = await User.findOne({ where: { name: req.body.name } });
        if (!user) {
            errorHandler.throwError(401, "Invalid name or password");
        }
        const okPassword = await argon2.verify(user.hash, req.body.password);
        if (!okPassword) {
            errorHandler.throwError(401, "Invalid name or password");
        }
        const token = jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.status(200).json({
            statusCode: 200,
            message: "Login successful",
            token
        });
    }
}

export default usersController