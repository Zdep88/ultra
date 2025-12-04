import { DataTypes, Model } from 'sequelize';
import sequelize from './connect.js';

class User extends Model { }

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: false,
    },
);

export default User;