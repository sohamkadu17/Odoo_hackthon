import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
export class User extends Model {
}
User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    language: {
        type: DataTypes.STRING,
        defaultValue: 'en',
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});
//# sourceMappingURL=User.js.map