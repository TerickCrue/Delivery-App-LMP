namespace DeliveryAPI.Data.DTOs
{
    public class CarritoConProductosDto
    {
        public CarritoDtoOut Carrito { get; set; }
        public List<CarritoProductoDtoOut> Productos { get; set; }
    }
}
