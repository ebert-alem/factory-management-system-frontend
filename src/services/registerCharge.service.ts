import { baseURL } from "../models";

// const baseUrl = "https://factoryapi.hopto.org/api/charge";

  export const registerCharge = async (chargeName: string, token: string) => {
    try {
      const response = await fetch(baseURL + 'charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token,
        },
        body: JSON.stringify({
            name: chargeName,
        }            
        ),
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
  };
  
  