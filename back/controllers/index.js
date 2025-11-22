import errorHandler from "../errorHandler.js";
import { sequelize } from "../data/sequelize.js";

const indexController = {

    async index(req, res) {
        let answer = { message: "Welcome to Ultra API !", serverStatus: "OK" };
        try {
            await sequelize.authenticate();
            answer.databaseStatus = 'OK';
        } catch (error) {
            console.error('Unable to connect to the database :\n' + error);
            answer.databaseStatus = 'KO';
        }
        res.status(200).json(answer);
    },

    error(req, res) {
        errorHandler.throwError(500, 'This is a forced error');
    },
};

export default indexController;