import { timestamp } from "rxjs/operators";
import { User } from "./user";

export interface OrdenCompra {
    idO?: string;
    usuario: string;
    totalSinIva: number;
    totalConIva: number,
    fechaIngreso?: Date
}
