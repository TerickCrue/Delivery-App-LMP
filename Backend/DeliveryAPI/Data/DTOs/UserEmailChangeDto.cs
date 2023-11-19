namespace DeliveryAPI.Data.DTOs
{
    public class UserEmailChangeDto
    {
        public string EmailActual { get; set; } = null!;

        public string EmailNuevo { get; set; } = null!;

        public string Pwd { get; set; } = null!;
    }
}
