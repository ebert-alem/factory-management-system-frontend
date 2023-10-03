import jwtDecode from "jwt-decode";
// const baseUrl = 'https://factoryapi.hopto.org/api/user/';
import { baseURL } from "../models";

export const loginUser = async (username: string, password: string) => {

  try {
    const response = await fetch(
      baseURL + 'user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      }
    );

    // console.log(response);

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error('Error en la solicitud de inicio de sesión');
    }
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (token: string) => {

  try {
    const response = await fetch(
      baseURL + 'user/logout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token,
        },
      }
    );

    if (response.ok) {
      console.log("Sesión cerrada");
    } else {
      throw new Error('Error en la solicitud de cierre de sesión');
    }
  } catch (error) {
    throw error;
  }
}

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode(token) as { exp: number };
  const expirationTime = decodedToken.exp * 1000;
  return Date.now() > expirationTime;
};
