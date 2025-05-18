export interface Order {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    startDate: Date;
    endDate: Date;
    status: string; 
    note: string;
    company_id: number;
}