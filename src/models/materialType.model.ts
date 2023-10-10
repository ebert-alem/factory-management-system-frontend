import { UnitOfMeasurement } from "./unitOfMeasurement.model";

export interface MaterialType {
    id: number;
    name: string;
    description: string;
    unitOfMeasurement: string;
}

export interface MaterialTypeInfo {
    id: number;
    name: string;
    unitOfMeasurement: UnitOfMeasurement;
}