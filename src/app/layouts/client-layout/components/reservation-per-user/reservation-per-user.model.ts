export interface Reservation {
    id: number;
    check_in: string;
    check_out: string;
    hostal: string;
    room: string;
    nights: number;
    adults: number;
    childs: number;
    total: number;
}

export interface ReservationPerUser {
    id: number;
    payment_type: string;
    payment_details: string;
    created_at: Date;
    client: string;
    total: number;
    status: string;
    reservations: Reservation[];
}
