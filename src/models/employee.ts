export interface Employee {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    storagePremission: boolean;
    orderPermission: boolean;
    employeePermission: boolean;
    
    companyId: number;
}