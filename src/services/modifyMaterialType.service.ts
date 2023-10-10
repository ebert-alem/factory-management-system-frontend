import { baseURL } from "../models";

type MaterialTypeFields = {
    id: number;
    name: string;
    description: string;
    unitOfMeasurement: string;
}

export const modifyMaterialType = async (fields: MaterialTypeFields, token: string) => {
    try {

        const response = await fetch(baseURL + 'materialType', {
            method: 'PUT',
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
            return error.message;
          }
        } catch (error) {
          console.error(error);
        }

}