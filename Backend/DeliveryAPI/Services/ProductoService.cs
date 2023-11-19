using DeliveryAPI.Data;
using DeliveryAPI.Data.DTOs;
using DeliveryAPI.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace DeliveryAPI.Services;

public class ProductoService
{
    private readonly PiaAppMovContext _context;

    public ProductoService(PiaAppMovContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Producto>> GetAll()
    {
        return await _context.Productos.ToListAsync();
    }

    public async Task<Producto?> GetById(int id)
    {
        return await _context.Productos.FindAsync(id);
    }

    public async Task<IEnumerable<Producto>> GetByNegocioId(int negocioId)
    {
        return await _context.Productos.Where(p => p.BusinessId == negocioId).ToListAsync();
    }

    public async Task<Producto> Create(ProductoDtoIn producto)
    {
        var newProducto = new Producto()
        {
            BusinessId = producto.BusinessId,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            ImagenUrl = producto.ImagenUrl,
        };

        _context.Productos.Add(newProducto);
        await _context.SaveChangesAsync();
        return newProducto;
    }

    public async Task Update(int id, ProductoDtoIn producto)
    {
        var existingProduct = await GetById(id);

        if (existingProduct is not null)
        {
            existingProduct.Nombre = producto.Nombre;
            existingProduct.Descripcion = producto.Descripcion;
            existingProduct.Precio = producto.Precio;
            existingProduct.ImagenUrl = producto.ImagenUrl;

            await _context.SaveChangesAsync();
        }

    }

    public async Task Delete(int id)
    {
        var productToDelete = await GetById(id);

        if (productToDelete is not null)
        {
            _context.Productos.Remove(productToDelete);

            await _context.SaveChangesAsync();
        }
    }
}
