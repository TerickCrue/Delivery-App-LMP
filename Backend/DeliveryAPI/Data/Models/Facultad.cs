using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DeliveryAPI.Data.Models
{
    public partial class Facultad
    {
        public Facultad()
        {
            Negocios = new HashSet<Negocio>();
            Usuarios = new HashSet<Usuario>();
        }

        public int Id { get; set; }
        public string? Nombre { get; set; }

        [JsonIgnore]
        public virtual ICollection<Negocio> Negocios { get; set; }
        [JsonIgnore]
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
