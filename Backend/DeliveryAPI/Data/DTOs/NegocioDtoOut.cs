namespace DeliveryAPI.Data.DTOs
{
    public class NegocioDtoOut
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string? FacultadNombre { get; set; }
        public string? Descripcion { get; set; }
        public string? BannerUrl { get; set; }
        public string? FotoPerfilUrl { get; set; }
    }
}
