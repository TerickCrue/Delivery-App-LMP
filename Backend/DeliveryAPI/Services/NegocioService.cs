using DeliveryAPI.Data;
using DeliveryAPI.Data.DTOs;
using DeliveryAPI.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace DeliveryAPI.Services;

public class NegocioService
{
    private readonly PiaAppMovContext _context;

    public NegocioService(PiaAppMovContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Negocio>> GetAll()
    {
        return await _context.Negocios.ToListAsync();
    }

    public async Task<Negocio?> GetById(int id)
    {
        return await _context.Negocios.FindAsync(id);
    }

    public async Task<IEnumerable<Negocio>> GetByFacultad(int faculty)
    {
        return await _context.Negocios.Where(n => n.FacultadId == faculty).ToListAsync();
    }

    public async Task<Negocio> Create(NegocioDtoIn negocio)
    {
        var newNegocio = new Negocio();

        newNegocio.Id = negocio.Id;
        newNegocio.UserId = negocio.UserId;
        newNegocio.Nombre = negocio.Nombre;
        newNegocio.FacultadId = negocio.FacultadId;
        newNegocio.Descripcion = negocio.Descripcion;
        newNegocio.FotoPerfilUrl = negocio.FotoPerfilUrl;
        newNegocio.BannerUrl = negocio.BannerUrl;

        _context.Negocios.Add(newNegocio);
        await _context.SaveChangesAsync();

        return newNegocio;
    }

    public async Task Update(int id, NegocioDtoIn negocio)
    {
        var negocioExistente = await GetById(id);

        if(negocioExistente is not null)
        {
            negocioExistente.Nombre = negocio.Nombre;
            negocioExistente.FacultadId = negocio.FacultadId;
            negocioExistente.Descripcion = negocio.Descripcion;
            negocioExistente.BannerUrl = negocio.BannerUrl;
            negocioExistente.FotoPerfilUrl = negocio.FotoPerfilUrl;

            await _context.SaveChangesAsync();
        }

        
    }

    public async Task Delete(int id)
    {

        var negocioABorrar = await GetById(id);

        if (negocioABorrar is not null)
        {
            _context.Negocios.Remove(negocioABorrar);

            await _context.SaveChangesAsync();
        }
    }
}
