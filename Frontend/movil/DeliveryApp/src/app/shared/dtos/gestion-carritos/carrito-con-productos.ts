import { CarritoProductoResponse } from "./carrito-producto-response";
import { CarritoResponse } from "./carrito-response";

export interface CarritoConProductos {

    carrito: CarritoResponse;
    productos: CarritoProductoResponse[];
}
