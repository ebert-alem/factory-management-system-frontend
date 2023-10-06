import { baseURL } from "../models";

export const disableUser = async (id: string, inactive: boolean, token: string) => {
    try {
        const response = await fetch(baseURL + 'user/activeDesactiveUser' + id, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
            },
            body: JSON.stringify({
                Inactive: inactive,
            }),
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