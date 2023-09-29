import { Charge } from "./charge.model";
import { User } from "./user.model";

export interface Employee {
    id: number;
    name: string;
    lastName: string;
    dni: string;
    charge: Charge;
    user: User;
    //movements: Movement[];
}

export interface EmployeeInfo {
    id: number,
    name: string,
    lastName: string,
    dni: string,
    charge: string,
    username: string,
    active: boolean,
}