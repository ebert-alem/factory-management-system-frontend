
const baseUrl = 'https://factory-management-system-api.onrender.com/api/user/login';

export const loginUser = async (username: string, password: string) => {

  try {
    const response = await fetch(
      baseUrl,
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

    console.log(response);

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
