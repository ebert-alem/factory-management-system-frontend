import { MaterialTypeInfo } from ".";

export interface Material {
    id: number;
    name: string;
    description: string;
    materialTypeId: number;
    price: number;
    stock: number;
    repositionPoint: number;
}

export interface MaterialInfo {
    id: number;
    name: string;
    description: string;
    materialType: MaterialTypeInfo;
    price: number;
    stock: number;
    repositionPoint: number;
}