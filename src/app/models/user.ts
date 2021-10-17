export interface Menu {
    name: string;
    path: string;
}

export interface User {
    userId: string;
    userMail: string;
    userName: string;
    menu: Menu[];
    iat: number;
    exp: number;
    type_user: string;
}