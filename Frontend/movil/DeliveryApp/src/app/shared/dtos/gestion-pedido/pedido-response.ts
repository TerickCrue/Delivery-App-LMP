import { CarritoProductoResponse } from "../gestion-carritos/carrito-producto-response";

export interface PedidoResponse 
{
    id: number;
    userId: number;
    nombreUsuario: string;
    businessId: number;
    nombreNegocio: string;
    imagenNegocio: string;
    direccionEntrega: string;
    total: number;
    metodopagoId: number;
    metodoPago: string;
    carritoId: number;
    fecha: string;
    status: string;
    productos: CarritoProductoResponse[];
}
