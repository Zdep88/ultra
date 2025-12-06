import argon2 from 'argon2';
import { User } from '../models/sequelize.js';
import errorHandler from "../errorHandler.js";

const usersController = {
    getAll: async (req, res) => {
        const users = await User.findAll();
        res.status(200).json({
            statusCode: 200,
            message: "Users retrieved successfully",
            users
        });
    },

    getOne: async (req, res) => {
        if (!req.params.id) {
            errorHandler.throwError(400, "User ID is required");
        }
        const id = Number(req.params.id);
        if ( isNaN(id) || !Number.isInteger(id) || id <= 0) {
            errorHandler.throwError(400, "Invalid user ID");
        }
        const user = await User.findByPk(id);
        if (!user) {
            errorHandler.throwError(404, "User not found");
        }
        res.status(200).json({
            statusCode: 200,
            message: "User retrieved successfully",
            user
        });
    },

    create: async (req, res) => {
        if (!req.body) {
            errorHandler.throwError(400, "Request body is missing");
        }
        if (!req.body.name || !req.body.password) {
            errorHandler.throwError(400, "Missing required fields: name and password");
        }
        const gemini = await User.findOne({ where: { name: req.body.name } });
        if (gemini) {
            errorHandler.throwError(409, "User with this name already exists");
        }
        const user = await User.create({
            name: req.body.name,
            hash: await argon2.hash(req.body.password)
        });
        res.status(201).json({
            statusCode: 201,
            message: "User created successfully",
            user
        });
    }
}

export default usersController