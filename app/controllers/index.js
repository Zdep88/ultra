import errorHandler from "../errorHandler.js";
import { sequelize } from '../models/sequelize.js';

const indexController = {
    getIndex: async (req, res) => {
        try {
            await sequelize.authenticate();
            res.status(200).json({
                statusCode : 200,
                message: "Back end is up and running"
            });
        } catch (error) {
            errorHandler.throwError(500, "Database connection failed");
        }
    }
}

export default indexController;