import { baseURL } from "../models";

type MovementField = {
    employeeId: number;
    type: string;
    details: MovementDetailField[];
  };

type MovementDetailField = {
    materialId: number;
    quantity: number;
    price?: number;
  };
  
  export const registerMovement = async (fields: MovementField, token: string) => {
    try {
      const response = await fetch(baseURL + 'movement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token,
        },
        body: JSON.stringify(fields),
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
  };
  