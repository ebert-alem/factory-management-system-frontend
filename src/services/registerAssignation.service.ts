import { baseURL } from "../models";

type AssignationField = {
    productId: number;
    assignations: {
      quantity: number;
      materialId: number;
    }[];
  };
  
  export const registerAssignation = async (fields: AssignationField, token: string) => {
    try {
      const response = await fetch(baseURL + 'product/assignation', {
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
  