
export interface UnitOfMeasurement {
    name: "liters" | "kilograms" | "units" | "meters";
    symbol: "L" | "kg" | "u" | "m";
}

export const traslateUnitOfMeasurement = (unitOfMeasurement: UnitOfMeasurement) => {
    switch (unitOfMeasurement.name) {
        case "liters":
            return "Litros";
        case "kilograms":
            return "Kilogramos";
        case "units":
            return "Unidades";
        case "meters":
            return "Metros";
        default:
            return "No definido";
    }
}

