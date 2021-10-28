
    export interface PricePerType {
        type: string;
        price: number;
    }

    export interface Price {
        title: string;
        price_per_type: PricePerType[];
    }

    export interface PriceList {
        affi_type: number;
        prices: Price[];
    }

    export interface Capacity {
        adults: number;
        childs: number;
    }

    export interface Rule {
        name: string;
        affi_type: number;
        amount: number;
    }

    export interface AffiBenefit {
        rules: Rule[];
    }

    export interface CapacityAndBenefit {
        type: string;
        capacity: Capacity;
        rooms: number;
        affi_benefits: AffiBenefit[];
    }

    export interface Hostal {
        _id?: string;
        name: string;
        description: string;
        pictures: string[];
        price_list: PriceList[];
        capacity_and_benefits: CapacityAndBenefit[];
    }

