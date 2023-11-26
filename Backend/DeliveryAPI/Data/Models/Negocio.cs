using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DeliveryAPI.Data.Models
{
    public partial class Negocio
    {
        public Negocio()
        {
            Carritos = new HashSet<Carrito>();
            Pedidos = new HashSet<Pedido>();
            Productos = new HashSet<Producto>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Nombre { get; set; } = null!;
        public int? FacultadId { get; set; }
        public string? Descripcion { get; set; }
        public string? BannerUrl { get; set; }
        public string? FotoPerfilUrl { get; set; }

        [JsonIgnore]
        public virtual Facultad? Facultad { get; set; }
        [JsonIgnore]
        public virtual Usuario User { get; set; } = null!;
        [JsonIgnore]
        public virtual ICollection<Carrito> Carritos { get; set; }
        [JsonIgnore]
        public virtual ICollection<Pedido> Pedidos { get; set; }
        [JsonIgnore]
        public virtual ICollection<Producto> Productos { get; set; }
    }
}
