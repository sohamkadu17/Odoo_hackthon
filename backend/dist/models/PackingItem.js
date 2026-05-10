import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import { Trip } from './Trip.js';
export var ItemCategory;
(function (ItemCategory) {
    ItemCategory["CLOTHING"] = "clothing";
    ItemCategory["DOCUMENTS"] = "documents";
    ItemCategory["ELECTRONICS"] = "electronics";
    ItemCategory["TOILETRIES"] = "toiletries";
    ItemCategory["MEDICATIONS"] = "medications";
    ItemCategory["OTHER"] = "other";
})(ItemCategory || (ItemCategory = {}));
export class PackingItem extends Model {
}
PackingItem.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tripId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Trip,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM(...Object.values(ItemCategory)),
        defaultValue: ItemCategory.OTHER,
    },
    isPacked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'PackingItem',
    tableName: 'packing_items',
    timestamps: true,
});
Trip.hasMany(PackingItem, { foreignKey: 'tripId' });
PackingItem.belongsTo(Trip, { foreignKey: 'tripId' });
//# sourceMappingURL=PackingItem.js.map