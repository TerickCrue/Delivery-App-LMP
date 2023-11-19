namespace DeliveryAPI.Data.DTOs
{
    public class ProductoDtoIn
    {
        public int Id { get; set; }

        public int BusinessId { get; set; }

        public string Nombre { get; set; } = null!;

        public string? Descripcion { get; set; }

        public decimal Precio { get; set; }

        public string? ImagenUrl { get; set; }

    }
}
