using System;
using System.Collections.Generic;
using DeliveryAPI.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace DeliveryAPI.Data;

public partial class PiaAppMovContext : DbContext
{
    public PiaAppMovContext()
    {
    }

    public PiaAppMovContext(DbContextOptions<PiaAppMovContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Carrito> Carritos { get; set; }

    public virtual DbSet<Carritoproducto> Carritoproductos { get; set; }

    public virtual DbSet<Facultad> Facultades { get; set; }

    public virtual DbSet<Formadepago> Formasdepago { get; set; }

    public virtual DbSet<Negocio> Negocios { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Carrito>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("carrito_pkey");

            entity.ToTable("carrito");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BusinessId).HasColumnName("business_id");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("fecha");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Business).WithMany(p => p.Carritos)
                .HasForeignKey(d => d.BusinessId)
                .HasConstraintName("carrito_business_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Carritos)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("carrito_user_id_fkey");
        });

        modelBuilder.Entity<Carritoproducto>(entity =>
        {
            entity.HasKey(e => new { e.CartId, e.ProductId }).HasName("carritoproducto_pkey");

            entity.ToTable("carritoproducto");

            entity.Property(e => e.CartId).HasColumnName("cart_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.PrecioSubtotal)
                .HasPrecision(10, 2)
                .HasColumnName("precio_subtotal");

            entity.HasOne(d => d.Cart).WithMany(p => p.Carritoproductos)
                .HasForeignKey(d => d.CartId)
                .HasConstraintName("carritoproducto_cart_id_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.Carritoproductos)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("carritoproducto_product_id_fkey");
        });

        modelBuilder.Entity<Facultad>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("facultad_pkey");

            entity.ToTable("facultad");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(20)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Formadepago>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("formadepago_pkey");

            entity.ToTable("formadepago");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Metodo)
                .HasMaxLength(100)
                .HasColumnName("metodo");
        });

        modelBuilder.Entity<Negocio>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("negocio_pkey");

            entity.ToTable("negocio");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BannerUrl)
                .HasMaxLength(255)
                .HasColumnName("banner_url");
            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.FacultadId).HasColumnName("facultad_id");
            entity.Property(e => e.FotoPerfilUrl)
                .HasMaxLength(255)
                .HasColumnName("foto_perfil_url");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Facultad).WithMany(p => p.Negocios)
                .HasForeignKey(d => d.FacultadId)
                .HasConstraintName("negocio_facultad_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Negocios)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("negocio_user_id_fkey");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pedido_pkey");

            entity.ToTable("pedido");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BusinessId).HasColumnName("business_id");
            entity.Property(e => e.CarritoId).HasColumnName("carrito_id");
            entity.Property(e => e.DireccionEntrega)
                .HasMaxLength(255)
                .HasColumnName("direccion_entrega");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("fecha");
            entity.Property(e => e.MetodopagoId).HasColumnName("metodopago_id");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasColumnName("status");
            entity.Property(e => e.Total)
                .HasPrecision(10, 2)
                .HasColumnName("total");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Business).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.BusinessId)
                .HasConstraintName("pedido_business_id_fkey");

            entity.HasOne(d => d.Carrito).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.CarritoId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_pedido_carrito");

            entity.HasOne(d => d.Metodopago).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.MetodopagoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pedido_metodopago_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("pedido_user_id_fkey");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("producto_pkey");

            entity.ToTable("producto");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BusinessId).HasColumnName("business_id");
            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.ImagenUrl)
                .HasMaxLength(255)
                .HasColumnName("imagen_url");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasPrecision(10, 2)
                .HasColumnName("precio");

            entity.HasOne(d => d.Business).WithMany(p => p.Productos)
                .HasForeignKey(d => d.BusinessId)
                .HasConstraintName("producto_business_id_fkey");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("usuario_pkey");

            entity.ToTable("usuario");

            entity.HasIndex(e => e.Email, "usuario_email_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(100)
                .HasColumnName("contraseña");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.FacultadId).HasColumnName("facultad_id");
            entity.Property(e => e.FotoPerfilUrl)
                .HasMaxLength(255)
                .HasColumnName("foto_perfil_url");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .HasColumnName("telefono");

            entity.HasOne(d => d.Facultad).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.FacultadId)
                .HasConstraintName("usuario_facultad_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
