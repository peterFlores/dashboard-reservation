    export interface Menu {
        _id?: string;
        status?: boolean;
        image?: string;
        path?: string;
        description?: string;
        name?: string;
        __v?: number;
    }

    export interface User {
        _id: string;
        first_name: string;
        second_name?: string;
        last_name: string;
        slast_name?: string;
        phone: string;
        email: string;
        dpi?: string;
        address?: string;
        profile_type: string;
        menu: Menu[];
        password: string;
    }