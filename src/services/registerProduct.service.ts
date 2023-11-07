import { baseURL } from "../models";

type ProductField = {
    name: string;
    description: string;
    color: string;
    size: number;
    price: number;
    stock: number;
    imageUrl: string;
  };
  
  export const registerProduct = async (fields: ProductField, token: string) => {
  
    try {
      const response = await fetch(baseURL + 'product', {
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
  