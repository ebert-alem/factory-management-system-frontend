
const baseUrl = "https://factory-management-system-api.onrender.com/api/user/signup";

type UserFields = {
  userName: string,
  password: string,
  name: string,
  lastName: string,
  DNI: string,
  chargeId: string,
};

export const registerUser = async (fields: UserFields, token: string) => {

  try {
    const response = await fetch(baseUrl, {
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
      return error.message;
    }
  } catch (error) {
    console.error(error);
  }
};
