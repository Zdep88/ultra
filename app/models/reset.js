import 'dotenv/config';
import argon2 from 'argon2';
import { sequelize, User } from './sequelize.js';

await sequelize.sync({ force: true })
console.log('Database has been reset.');

await User.create({ name: process.env.ADMIN_NAME, hash: await argon2.hash(process.env.ADMIN_PASSWORD) });
console.log('Admin user has been created.');

process.exit(0);