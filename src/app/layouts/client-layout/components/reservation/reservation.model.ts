export interface CapacityArray {
    _id: string;
    type: string;
    rooms: number;
    total_price: number;
    availability: string;
}

export interface Reservation {
    date_arrival: string;
    date_departure: string;
    adults: number;
    childs: number;
    Capacity_Array: CapacityArray[];
}