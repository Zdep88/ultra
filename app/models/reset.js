import { sequelize } from './sequelize.js';

await sequelize.sync({ force: true })
console.log('Database has been reset.');

process.exit(0);