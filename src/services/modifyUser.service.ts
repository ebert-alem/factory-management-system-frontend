import { User, baseURL } from "../models";

export const modifyUser = async (fields: User, token: string) => {
    try {
        const response = await fetch(baseURL + 'user', {
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