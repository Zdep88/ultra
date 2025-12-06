import errorHandler from "../errorHandler.js";
import { User } from '../models/sequelize.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const authController = {
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
    },

    auth: async (req, res, next) => {
        if (!req.headers.authorization) {
            errorHandler.throwError(401, 'Authorization header is required');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            errorHandler.throwError(401, 'Bearer token is required');
        }
        try {
            var tokenContent = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            errorHandler.throwError(401, 'Invalid or expired token');
        }
        const userId = tokenContent.id;
        let user = await User.findByPk(userId);
        if (!user) {
            errorHandler.throwError(401, 'User not found');
        }
        req.user = { id: user.id };
        next();
    },

    authCheck: (req, res) => {
        res.status(200).json({
            statusCode: 200,
            message: "Authentication successful",
            userId: req.user.id
        });
    },

    admin: async (req, res, next) => {
        if (req.user.id !== 1) {
            errorHandler.throwError(403, 'Admin access required');
        }
        next();
    },

    adminCheck: (req, res) => {
        res.status(200).json({
            statusCode: 200,
            message: "Admin access confirmed"
        });
    }
};

export default authController;