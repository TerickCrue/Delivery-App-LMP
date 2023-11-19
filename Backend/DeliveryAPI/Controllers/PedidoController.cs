using DeliveryAPI.Data.DTOs;
using DeliveryAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace DeliveryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidoController : ControllerBase
{
    private readonly PedidoService _pedidoService;
    private readonly NegocioService _negocioService;
    private readonly UsuarioService _usuarioService;

    public PedidoController(PedidoService pedidoService, NegocioService negocioService, UsuarioService usuarioService)
    {
        _pedidoService = pedidoService;
        _negocioService = negocioService;
        _usuarioService = usuarioService;
    }

    [HttpGet("getall")]
    public async Task<IActionResult> GetPedidos()
    {
        var pedidos = await _pedidoService.GetAll();
        return Ok(pedidos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPedidoById(int id)
    {
        var pedido = await _pedidoService.GetDtoById(id);

        if (pedido is not null)
        {
            return Ok(pedido);
        }
        else
            return PedidoNotFound(id);


    }

    [HttpGet("negocio/{negocioId}")]
    public async Task<IActionResult> GetPedidosOfNegocio(int negocioId)
    {
        var negocio = await _negocioService.GetById(negocioId);
        

        if (negocio is not null)
        {
            var pedidos = await _pedidoService.GetByNegocioId(negocioId);
            return Ok(pedidos);
        }
        else
            return NegocioNotFound(negocioId);

    }

    [HttpGet("usuario/{usuarioId}")]
    public async Task<IActionResult> GetPedidosOfUsuario(int usuarioId)
    {
        var usuario = await _usuarioService.GetById(usuarioId);
        
        if (usuario is not null)
        {
            var pedidos = await _pedidoService.GetByUserId(usuarioId);
            return Ok(pedidos);
        }
        else
            return UsuarioNotFound(usuarioId);

    }

    [HttpPost("create")]
    public async Task<IActionResult> AddPedido(PedidoDtoIn pedidoDto)
    {
        var newPedido = await _pedidoService.Create(pedidoDto);
        return CreatedAtAction(nameof(GetPedidoById), new { id = newPedido.Id }, newPedido);
    }


    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdatePedido(int id, PedidoDtoIn pedidoDto)
    {

        if (id != pedidoDto.Id)
            return BadRequest(new { message = $"El ID ({id}) de la URL  no coincide con el ID ({pedidoDto.Id}) del cuerpo de la solicitud. " });

        var pedidoToUpdate = await _pedidoService.GetById(id);

        if(pedidoToUpdate is not null)
        {
            await _pedidoService.Update(id, pedidoDto);
            return NoContent();

        }
        else
            return PedidoNotFound(id);

    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeletePedido(int id)
    {
        var pedidoToDelete = await _pedidoService.GetById(id);

        if (pedidoToDelete is not null)
        {
            var result = await isDeletable(id);

            if (result)
            {
                await _pedidoService.Delete(id);
                return Ok();
            }
            else
                return BadRequest(new { message = $"No se puede eliminar un pedido ya aceptado " });

            

        }
        else
            return PedidoNotFound(id);
       
    }

    public async Task<bool> isDeletable(int id)
    {
        var respuesta = true;
        var pedido = await _pedidoService.GetById(id);
        var estado = pedido.Status;


        if (estado.Equals("aceptado"))
            respuesta = false;

        return respuesta;

    }


    public NotFoundObjectResult PedidoNotFound(int id)
    {
        return NotFound(new { message = $"El pedido con ID = {id} no existe. " });
    }

    public NotFoundObjectResult NegocioNotFound(int id)
    {
        return NotFound(new { message = $"El negocio con ID = {id} no existe. " });
    }

    public NotFoundObjectResult UsuarioNotFound(int id)
    {
        return NotFound(new { message = $"El usuario con ID = {id} no existe. " });
    }
}