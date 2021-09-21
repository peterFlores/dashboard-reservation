export interface Client {
    _id: string;
    password: string;
    affiliate: string;
    client_type: string;
    address?: string;
    dpi?: string;
    email: string;
    phone: string;
    slast_name?: string;
    last_name: string;
    second_name?: string;
    first_name: string;
}