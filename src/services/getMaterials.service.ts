import { baseURL } from "../models";

export const getMaterials = async(token: string) => {
    try {
        const response = await fetch(baseURL + "material", {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
                'Language': 'es'
            },
        })

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