namespace DeliveryAPI.Data.DTOs
{
    public class UserLoginDtoOut
    {
        public int Id { get; set; }

        public string Token { get; set; } = null!;
    }
}
