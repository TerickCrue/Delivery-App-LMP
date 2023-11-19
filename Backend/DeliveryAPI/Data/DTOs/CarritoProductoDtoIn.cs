namespace DeliveryAPI.Data.DTOs
{
    public class CarritoProductoDtoIn
    {
        public int CartId { get; set; }

        public int ProductoId { get; set; }

        public int? Cantidad { get; set; }

    }
}
