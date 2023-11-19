using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DeliveryAPI.Data.Models;

public partial class Producto
{
    public int Id { get; set; }

    public int BusinessId { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public decimal Precio { get; set; }

    public string? ImagenUrl { get; set; }

    [JsonIgnore]
    public virtual Negocio Business { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Carritoproducto> Carritoproductos { get; set; } = new List<Carritoproducto>();
}
