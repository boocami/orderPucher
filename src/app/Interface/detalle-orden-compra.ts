import { OrdenCompra } from "./orden-compra";
import { Productos } from "./productos";

export interface DetalleOrdenCompra {
    producto?: Productos;
    cantidad?: number;  
    nombreP?: string;
    precioProducto?:number;
    idO?: string;
}
