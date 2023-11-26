using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DeliveryAPI.Data.Models
{
    public partial class Carrito
    {
        public Carrito()
        {
            Carritoproductos = new HashSet<Carritoproducto>();
            Pedidos = new HashSet<Pedido>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public int BusinessId { get; set; }
        public DateTime? Fecha { get; set; }

        [JsonIgnore]
        public virtual Negocio Business { get; set; } = null!;
        [JsonIgnore]
        public virtual Usuario User { get; set; } = null!;
        [JsonIgnore]
        public virtual ICollection<Carritoproducto> Carritoproductos { get; set; }
        [JsonIgnore]
        public virtual ICollection<Pedido> Pedidos { get; set; }
    }
}
