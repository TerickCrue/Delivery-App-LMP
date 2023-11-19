using DeliveryAPI.Data.DTOs;
using DeliveryAPI.Data.Models;
using DeliveryAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace DeliveryAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CarritoController : ControllerBase
{
    private readonly CarritoService _carritoService;
    private readonly UsuarioService _usuarioService;
    private readonly NegocioService _negocioService;

    public CarritoController(CarritoService carritoService, UsuarioService usuarioService, NegocioService negocioService)
    {
        _carritoService = carritoService;
        _usuarioService = usuarioService;
        _negocioService = negocioService;
    }


    [HttpGet("getall")]
    public async Task<IActionResult> GetCarritos()
    {
        var carritos = await _carritoService.GetAll();
        return Ok(carritos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCarritoById(int id)
    {
        var carrito = await _carritoService.GetById(id);
        if (carrito is null)
            return NotFound();

        return Ok(carrito);
    }

    [HttpGet("usuario/{usuarioId}")]
    public async Task<IActionResult> GetCarritosOfUsuario(int usuarioId)
    {
        var carritos = await _carritoService.GetCarritosSinPedido(usuarioId);
        if (carritos is not null)
            return Ok(carritos);

        return NotFound();
    }

    [HttpGet("usuario/{usuarioId}/productos")]
    public async Task<IActionResult> GetCarritosConProductos(int usuarioId)
    {
        var carritos = await _carritoService.GetCarritosConProductos(usuarioId);
        if (carritos is not null)
            return Ok(carritos);

        return NotFound();
    }

    [HttpGet("negocio/{negocioId}")]
    public async Task<IActionResult> GetCarritosOfNegocio(int negocioId)
    {
        var carritos = await _carritoService.GetByNegocioId(negocioId);
        if (carritos is not null)
            return Ok(carritos);

        return NotFound();
    }

    [HttpGet("{carritoId}/productos")]
    public async Task<IActionResult> GetProductosEnCarrito(int carritoId)
    {
        var carrito = await GetCarritoById(carritoId);

        if (carrito is not null)
        {
            var productos = await _carritoService.GetProductosDtoEnCarrito(carritoId);
            return Ok(productos);
        }

        return CarritoNotFound(carritoId);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateCarrito(CarritoDtoIn carrito)
    {
        var usuario = await _usuarioService.GetById(carrito.UserId);
        var negocio = await _negocioService.GetById(carrito.BusinessId);

        if (usuario is not null && negocio is not null)
        {
            var newCarrito = await _carritoService.Create(carrito);
            return CreatedAtAction(nameof(GetCarritoById), new { id = newCarrito.Id }, newCarrito);
        }
        return BadRequest(new { message = $"El id de usuario y / o id de negocio de la solicitud no existe. " });
    }


    [HttpPost("agregar/usuario/{usuarioId}/negocio/{negocioId}")]
    public async Task<IActionResult> AgregarProductoAlCarrito(int usuarioId, int negocioId, CarritoProductoDtoIn productoDto)
    {
        var respuesta = await _carritoService.ProductoEnCarrito(usuarioId, negocioId, productoDto.ProductoId);

        if (respuesta)
        {
            return BadRequest(new { message = $"Este producto ya se encuentra en tu carrito" });
        }

        var productoAgregado = await _carritoService.AgregarProductoACarrito(usuarioId, negocioId, productoDto);
        return CreatedAtAction(nameof(GetProductosEnCarrito), new { carritoId = productoAgregado.CartId }, productoAgregado);
    }

    [HttpPut("modificar/{carritoId}/producto")]
    public async Task<IActionResult> ModificarCantidadDeProducto(int carritoId, CarritoProductoDtoIn productoDto)
    {
        var carrito = await GetCarritoById(carritoId);

        if(carritoId != productoDto.CartId)
        {
            return BadRequest(new { message = $"Los id´s proporcionados no coinciden" });
        }
        if(carrito is not null)
        {
            await _carritoService.ModificarCantidadDeProducto(productoDto);
        }
        else
        {
            return CarritoNotFound(carritoId);
        }

        return NoContent();
    }

    [HttpDelete("delete/{carritoId}/productos/{productoId}")]
    public async Task<IActionResult> EliminarProductoDeCarrito(int carritoId, int productoId)
    {
        var carrito = await GetCarritoById(carritoId);

        if (carrito is not null)
        {
            await _carritoService.EliminarProductoDeCarrito(carritoId, productoId);
        }
        else
        {
            return CarritoNotFound(carritoId);
        }

        return Ok();
    }


    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteCarrito(int id)
    {
        var carrito = await _carritoService.GetById(id);
        if (carrito is not null)
        {
            await _carritoService.Delete(id);
            return Ok();
        }
        else
            return CarritoNotFound(id);

    }


    public NotFoundObjectResult CarritoNotFound(int id)
    {
        return NotFound(new { message = $"El carrito con ID = {id} no existe. " });
    }
}
