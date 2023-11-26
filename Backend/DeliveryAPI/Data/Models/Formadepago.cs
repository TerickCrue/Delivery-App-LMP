using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DeliveryAPI.Data.Models
{
    public partial class Formadepago
    {
        public Formadepago()
        {
            Pedidos = new HashSet<Pedido>();
        }

        public int Id { get; set; }
        public string? Metodo { get; set; }

        [JsonIgnore]
        public virtual ICollection<Pedido> Pedidos { get; set; }
    }
}
