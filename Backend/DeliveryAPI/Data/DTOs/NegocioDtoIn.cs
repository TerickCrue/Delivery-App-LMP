namespace DeliveryAPI.Data.DTOs
{
    public class NegocioDtoIn
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Nombre { get; set; } = null!;

        public int? FacultadId { get; set; }

        public string? Descripcion { get; set; }

        public string? BannerUrl { get; set; }

        public string? FotoPerfilUrl { get; set; }
    }
}
