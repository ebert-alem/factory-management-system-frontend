import { baseURL } from "../models";

type EmployeeFields = {
    id: number;
    name: string;
    lastName: string;
    dni: string;
    chargeId: number;
}

export const modifyEmployee = async (fields: EmployeeFields, token: string) => {
    try {

        const response = await fetch(baseURL + 'employee', {
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