
import { baseURL } from "../models";
// const baseURL = 'https://factoryapi.hopto.org/api/';

export const getCharges = async (token: string) => {

    try {
        const response = await fetch(baseURL + "charge", {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
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
