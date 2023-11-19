namespace DeliveryAPI.Data.DTOs
{
    public class CarritoProductoDtoOut
    {
        public int CartId { get; set; }

        public int ProductoId { get; set; }

        public string? NombreProducto { get; set; }

        public string? imagenUrl { get; set; }

        public int? Cantidad { get; set; }

        public decimal? PrecioSubtotal { get; set; }
    }
}
