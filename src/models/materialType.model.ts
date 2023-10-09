import { UnitOfMeasurement } from "./unitOfMeasurement.model";

export interface MaterialType {
    id: number;
    name: string;
    description: string;
    unitOfMeasurement: UnitOfMeasurement;
}

export interface MaterialTypeInfo {
    id: number;
    name: string;
    unitOfMeasurement: UnitOfMeasurement;
}