import { baseURL } from "../models";

type TypeOfMaterialFields = {
    name: string;
    description: string;
    unitOfMeasurement: string;
}

export const registerMaterialType = async (fields: TypeOfMaterialFields, token: string) => {
    try {

        const response = await fetch(baseURL + 'materialType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
            },
            body: JSON.stringify(fields)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            const error = await response.json();
            throw error;
          }
        } catch (error) {
          throw error;
        }

}