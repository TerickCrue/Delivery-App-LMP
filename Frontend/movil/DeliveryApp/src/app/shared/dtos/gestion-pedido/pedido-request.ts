export interface PedidoRequest
{
    userId: number,
    businessId: number,
    direccionEntrega: string,
    total: number,
    metodopagoId: number,
    carritoId: number,
    status: string
} 

