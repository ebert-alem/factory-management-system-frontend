import { UnitOfMeasurement } from "./unitOfMeasurement.model";

export interface TypeOfMaterial {
    id: number;
    name: string;
    description: string;
    unitOfMeasurement: UnitOfMeasurement;
}