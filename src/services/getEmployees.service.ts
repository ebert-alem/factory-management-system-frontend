import { baseURL } from "../models";

export const getEmployees = async (token: string) => {
    try {
        const response = await fetch(baseURL + "employee", {
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

// export const transformData = (data: Employee[]) => {
//     return data.map((employee) => ({
//         id: employee.id,
//         name: employee.name,
//         lastName: employee.lastName,
//         dni: employee.dni,
//         charge: employee.charge.name,
//         username: employee.user.userName,
//         inactive: employee.user.inactive,
//     }));
// };

