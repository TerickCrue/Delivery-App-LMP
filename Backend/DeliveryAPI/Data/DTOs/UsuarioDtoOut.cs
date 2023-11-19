namespace DeliveryAPI.Data.DTOs
{
    public class UsuarioDtoOut
    {
        public string Nombre { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? Telefono { get; set; }

        public string? FacultadNombre { get; set; }

        public string? FotoPerfilUrl { get; set; }
    }
}
