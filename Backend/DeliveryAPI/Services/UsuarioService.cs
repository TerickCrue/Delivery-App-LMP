using DeliveryAPI.Data;
using DeliveryAPI.Data.DTOs;
using DeliveryAPI.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;
using BC = BCrypt.Net.BCrypt;


namespace DeliveryAPI.Services;

public class UsuarioService
{
    private readonly PiaAppMovContext _context;
    private readonly LoginService _loginService;

    public UsuarioService(PiaAppMovContext context, LoginService loginService)
    {
        _context = context;
        _loginService = loginService;
    }

    public async Task<IEnumerable<Usuario>> GetAll()
    {
        return await _context.Usuarios.ToListAsync();
    }

    public async Task<Usuario?> GetById(int id)
    {
        return await _context.Usuarios.FindAsync(id);
    }
    public async Task<UsuarioDtoOut?> GetDtoById(int id)
    {
        return await _context.Usuarios.Where(u => u.Id == id).Select(u => new UsuarioDtoOut
        {
            Nombre = u.Nombre,
            Email = u.Email,
            FacultadNombre = u.Facultad.Nombre,
            FotoPerfilUrl = u.FotoPerfilUrl,
            Telefono = u.Telefono
        }).SingleOrDefaultAsync();

    }

    public async Task<Usuario?> GetByEmail(string email)
    {
        return await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task <Usuario> Create(Usuario nuevoUsuario)
    {
        var usuario = new Usuario();
        usuario = nuevoUsuario;
        usuario.Contraseña = BC.HashPassword(nuevoUsuario.Contraseña);

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return nuevoUsuario;
    }

    public async Task Update(int id, Usuario usuario)
    {
        var existingUser = await GetById(id);

        if (existingUser is not null){
            existingUser.Nombre = usuario.Nombre;
            existingUser.Telefono = usuario.Telefono;
            existingUser.FacultadId = usuario.FacultadId;

            await _context.SaveChangesAsync();

        }
            
    }

    public async Task<bool> UpdatePassword(int id, UserPwdChangeDto userData)
    {
        var response = false;
        var existingUser = await GetById(id);

        if (existingUser is not null)
        {
            if (BC.Verify(userData.ContraseñaActual, existingUser.Contraseña)) {

                existingUser.Contraseña = BC.HashPassword(userData.ContraseñaNueva);

                await _context.SaveChangesAsync();

                response = true;
            }
        }

        return response;

    }

    public async Task<UserLoginDtoOut> UpdateEmail(int id, UserEmailChangeDto userData)
    {
        var existingUser = await GetById(id);
        var existingEmailUser = await GetByEmail(userData.EmailNuevo);
        var userCreds = new UserLoginDtoOut();
        var user = new UserLoginDtoIn();

        //verificar si existe ya un usuario con ese correo
        if (existingEmailUser is not null)
        {
            return null;
        }
        else
        {
            if (existingUser is not null)
            {
                if (userData.EmailActual.Equals(existingUser.Email))
                {
                    existingUser.Email = userData.EmailNuevo;
                    await _context.SaveChangesAsync();
                    
                }

                //generar un nuevo JWT con el correo actualizado
                user.Email = existingUser.Email;
                user.Pwd = userData.Pwd;
                var newCreds = await _loginService.AuthenticateUser(user);

                userCreds = newCreds;
            }
        }
        
        
        return userCreds;
    }

    public async Task Delete(int id)
    {
        var userToDelete = await GetById(id);

        if (userToDelete is not null)
        {
            _context.Usuarios.Remove(userToDelete);
            await _context.SaveChangesAsync();
        }
    }


    public async Task<bool> VerifyPwd(string email, string pwd)
    {
        var coincidence = await _context.Usuarios.SingleOrDefaultAsync(x => x.Email == email);

        if (coincidence == null || !BC.Verify(pwd, coincidence.Contraseña))
        {
            return false;
        }
        else
            return true;
    }






}

