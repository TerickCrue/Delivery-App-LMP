namespace DeliveryAPI.Data.DTOs
{
    public class PedidoDtoIn
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int BusinessId { get; set; }

        public string? DireccionEntrega { get; set; }

        public decimal Total { get; set; }

        public int MetodopagoId { get; set; }

        public int CarritoId { get; set; }

        public string Status { get; set; } = null!;
    }
}
