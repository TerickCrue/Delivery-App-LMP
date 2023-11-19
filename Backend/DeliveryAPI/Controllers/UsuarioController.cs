using DeliveryAPI.Data.DTOs;
using DeliveryAPI.Data.Models;
using DeliveryAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace DeliveryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly UsuarioService _usuarioService;

    public UsuarioController(UsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpGet("getall")]
    public async Task<IActionResult> GetUsuarios()
    {
        var usuarios = await _usuarioService.GetAll();
        return Ok(usuarios);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUsuarioById(int id)
    {
        var usuario = await _usuarioService.GetDtoById(id);

        if (usuario is null)
            return UserNotFound(id);

        return Ok(usuario);

    }

    [HttpGet("email/{email}")]
    public async Task<IActionResult> GetUsuarioByEmail(string email)
    {
        var usuario = await _usuarioService.GetByEmail(email);
        if (usuario == null)
            return UserNotFound(email);

        return Ok(usuario);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateUsuario(Usuario usuario)
    {
        var existingUser = await _usuarioService.GetByEmail(usuario.Email);

        if (existingUser is null)
        {
            var newUsuario = await _usuarioService.Create(usuario);
            return CreatedAtAction(nameof(GetUsuarioById), new { id = newUsuario.Id }, newUsuario);
        }
        return BadRequest(new { message = $"Email ya registrado " });
        
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateUsuario(int id, Usuario usuario)
    {

        if(id != usuario.Id)
            return BadRequest(new { message = $"El ID ({id}) de la URL  no coincide con el ID ({usuario.Id}) del cuerpo de la solicitud. " });


        var userToUpdate = await _usuarioService.GetById(id);

        if (userToUpdate is not null)
        {
            await _usuarioService.Update(id, usuario);
            return NoContent();
        }
        else
            return UserNotFound(id);

    }

    [HttpPut("update/password/{id}")]
    public async Task<IActionResult> UpdateContraseñaUsuario(int id, UserPwdChangeDto userData)
    {

        var response = await _usuarioService.UpdatePassword(id, userData);


        if (!response)
            return BadRequest(new { message = $"Contraseña actual incorrecta" });
        else
        {
            return Ok(new { message = $"Contraseña actualizada con éxito" });
        }
    }

    [HttpPut("update/email/{id}")]
    public async Task<IActionResult> UpdateEmailUsuario(int id, UserEmailChangeDto userData)
    {

        var verif = await _usuarioService.VerifyPwd(userData.EmailActual, userData.Pwd);

        if (!verif)
            return BadRequest(new { message = $"Contraseña actual incorrecta" });

        var newCreds = await _usuarioService.UpdateEmail(id, userData);

        if(newCreds is null)
        {
            return BadRequest(new { message = $"Email ya registrado" });
            
        }

        return Ok(newCreds);


    }



    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUsuario(int id)
    {
        var userToDelete = await _usuarioService.GetById(id);

        if (userToDelete is not null)
        {
            await _usuarioService.Delete(id);
            return Ok();
        }
        else
        {
            return UserNotFound(id);
        }
    }


    public NotFoundObjectResult UserNotFound(int id)
    {
        return NotFound(new { message = $"El usuario con ID = {id} no existe. " });
    }

    public NotFoundObjectResult UserNotFound(string email)
    {
        return NotFound(new { message = $"El usuario con email = {email} no existe. " });
    }
}
