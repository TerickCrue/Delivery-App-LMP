using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DeliveryAPI.Data.Models;

public partial class Pedido
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int BusinessId { get; set; }

    public DateTime? Fecha { get; set; }

    public string? DireccionEntrega { get; set; }

    public string Status { get; set; } = null!;

    public decimal Total { get; set; }

    public int MetodopagoId { get; set; }

    public int CarritoId { get; set; }

    [JsonIgnore]
    public virtual Negocio Business { get; set; } = null!;

    [JsonIgnore]
    public virtual Carrito? Carrito { get; set; }

    [JsonIgnore]
    public virtual Formadepago Metodopago { get; set; } = null!;

    [JsonIgnore]
    public virtual Usuario User { get; set; } = null!;
}
