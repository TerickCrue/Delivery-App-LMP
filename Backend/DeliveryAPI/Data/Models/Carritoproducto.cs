using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DeliveryAPI.Data.Models;

public partial class Carritoproducto
{
    public int CartId { get; set; }

    public int ProductId { get; set; }

    public int? Cantidad { get; set; }

    public decimal? PrecioSubtotal { get; set; }

    [JsonIgnore]
    public virtual Carrito Cart { get; set; } = null!;

    [JsonIgnore]
    public virtual Producto Product { get; set; } = null!;
}
