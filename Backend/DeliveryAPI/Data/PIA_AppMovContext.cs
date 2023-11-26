using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using DeliveryAPI.Data.Models;

namespace DeliveryAPI.Data
{
    public partial class PIA_AppMovContext : DbContext
    {
        public PIA_AppMovContext()
        {
        }

        public PIA_AppMovContext(DbContextOptions<PIA_AppMovContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Carrito> Carritos { get; set; } = null!;
        public virtual DbSet<Carritoproducto> Carritoproductos { get; set; } = null!;
        public virtual DbSet<Facultad> Facultads { get; set; } = null!;
        public virtual DbSet<Formadepago> Formadepagos { get; set; } = null!;
        public virtual DbSet<Negocio> Negocios { get; set; } = null!;
        public virtual DbSet<Pedido> Pedidos { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Carrito>(entity =>
            {
                entity.ToTable("carrito");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BusinessId).HasColumnName("business_id");

                entity.Property(e => e.Fecha)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Business)
                    .WithMany(p => p.Carritos)
                    .HasForeignKey(d => d.BusinessId)
                    .HasConstraintName("carrito_business_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carritos)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("carrito_user_id_fkey");
            });

            modelBuilder.Entity<Carritoproducto>(entity =>
            {
                entity.HasKey(e => new { e.CartId, e.ProductId });

                entity.ToTable("carritoproducto");

                entity.Property(e => e.CartId).HasColumnName("cart_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.PrecioSubtotal)
                    .HasColumnType("numeric(10, 2)")
                    .HasColumnName("precio_subtotal");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.Carritoproductos)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("carritoproducto_cart_id_fkey");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Carritoproductos)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("carritoproducto_product_id_fkey");
            });

            modelBuilder.Entity<Facultad>(entity =>
            {
                entity.ToTable("facultad");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Formadepago>(entity =>
            {
                entity.ToTable("formadepago");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Metodo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("metodo");
            });

            modelBuilder.Entity<Negocio>(entity =>
            {
                entity.ToTable("negocio");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BannerUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("banner_url");

                entity.Property(e => e.Descripcion)
                    .HasColumnType("text")
                    .HasColumnName("descripcion");

                entity.Property(e => e.FacultadId).HasColumnName("facultad_id");

                entity.Property(e => e.FotoPerfilUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("foto_perfil_url");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Facultad)
                    .WithMany(p => p.Negocios)
                    .HasForeignKey(d => d.FacultadId)
                    .HasConstraintName("negocio_facultad_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Negocios)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("negocio_user_id_fkey");
            });

            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.ToTable("pedido");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BusinessId).HasColumnName("business_id");

                entity.Property(e => e.CarritoId).HasColumnName("carrito_id");

                entity.Property(e => e.DireccionEntrega)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("direccion_entrega");

                entity.Property(e => e.Fecha)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.MetodopagoId).HasColumnName("metodopago_id");

                entity.Property(e => e.Status)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("status");

                entity.Property(e => e.Total)
                    .HasColumnType("numeric(10, 2)")
                    .HasColumnName("total");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Business)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.BusinessId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pedido_business_id_fkey");

                entity.HasOne(d => d.Carrito)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.CarritoId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("fk_pedido_carrito");

                entity.HasOne(d => d.Metodopago)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.MetodopagoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pedido_metodopago_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pedido_user_id_fkey");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.ToTable("producto");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BusinessId).HasColumnName("business_id");

                entity.Property(e => e.Descripcion)
                    .HasColumnType("text")
                    .HasColumnName("descripcion");

                entity.Property(e => e.ImagenUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("imagen_url");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.Precio)
                    .HasColumnType("numeric(10, 2)")
                    .HasColumnName("precio");

                entity.HasOne(d => d.Business)
                    .WithMany(p => p.Productos)
                    .HasForeignKey(d => d.BusinessId)
                    .HasConstraintName("producto_business_id_fkey");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuario");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Contraseña)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("contraseña");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FacultadId).HasColumnName("facultad_id");

                entity.Property(e => e.FotoPerfilUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("foto_perfil_url");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.Telefono)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("telefono");

                entity.HasOne(d => d.Facultad)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.FacultadId)
                    .HasConstraintName("usuario_facultad_id_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
