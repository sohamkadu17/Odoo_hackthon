import { Model } from 'sequelize';
export declare class User extends Model {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePhoto?: string;
    language: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=User.d.ts.map