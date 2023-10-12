import { baseURL } from "../models";

export const deleteMaterial = async (id: string, token: string) => {
    try {
        const response = await fetch(baseURL + 'material/' + id, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
            }
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