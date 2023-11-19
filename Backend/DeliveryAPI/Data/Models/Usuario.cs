using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DeliveryAPI.Data.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Telefono { get; set; }

    public int? FacultadId { get; set; }

    public string Contraseña { get; set; } = null!;

    public string? FotoPerfilUrl { get; set; }

    [JsonIgnore]
    public virtual ICollection<Carrito> Carritos { get; set; } = new List<Carrito>();

    [JsonIgnore]
    public virtual Facultad? Facultad { get; set; }

    [JsonIgnore]
    public virtual ICollection<Negocio> Negocios { get; set; } = new List<Negocio>();

    [JsonIgnore]
    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
