import { baseURL } from "../models";

type MaterialFields = {
    id: number;
    name: string;
    description: string;
    materialTypeId: number;
    stock: number;
    repositionPoint: number;
}

export const modifyMaterial = async (fields: MaterialFields, token: string) => {
    try {

        const response = await fetch(baseURL + 'material', {
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
            throw error;
          }
        } catch (error) {
          throw error;
        }

}