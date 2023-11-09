export interface UserInfo {
    Token: string;
    EmployeeId: number;
    Charge: string;
}

export interface User {
    id: number;
    username: string;
    password?: string;
    inactive?: boolean;
}