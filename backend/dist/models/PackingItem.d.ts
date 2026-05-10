import { Model } from 'sequelize';
export declare enum ItemCategory {
    CLOTHING = "clothing",
    DOCUMENTS = "documents",
    ELECTRONICS = "electronics",
    TOILETRIES = "toiletries",
    MEDICATIONS = "medications",
    OTHER = "other"
}
export declare class PackingItem extends Model {
    id: string;
    tripId: string;
    name: string;
    category: ItemCategory;
    isPacked: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=PackingItem.d.ts.map