using DeliveryAPI.Data.DTOs;
using DeliveryAPI.Data.Models;
using DeliveryAPI.Services;
using Microsoft.AspNetCore.Mvc;


namespace DeliveryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductoController : ControllerBase
{
    private readonly ProductoService _productoService;
    private readonly NegocioService _negocioService;

    public ProductoController(ProductoService productoService, NegocioService negocioService)
    {
        _productoService = productoService;
        _negocioService = negocioService;
    }

    [HttpGet("getall")]
    public async Task<IActionResult> GetAllProductos()
    {
        var productos = await _productoService.GetAll();
        return Ok(productos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductoById(int id)
    {
        var producto = await _productoService.GetById(id);

        if (producto is not null)
        {
            return Ok(producto);
        }
        else
            return ProductNotFound(id);

    }

    [HttpGet("negocio/{negocioId}")]
    public async Task<IActionResult> GetProductoByNegocioId(int negocioId)
    {

        var negocio = await _negocioService.GetById(negocioId);

        if (negocio is not null)
        {
            var productos = await _productoService.GetByNegocioId(negocioId);
            return Ok(productos);
        }
        else
            return NegocioNotFound(negocioId);

    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateProducto(ProductoDtoIn productoDto)
    {
 
        var newProducto = await _productoService.Create(productoDto);
        return CreatedAtAction(nameof(GetProductoById), new { id = newProducto.Id }, newProducto);
    }


    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateProducto(int id,  ProductoDtoIn productoDto)
    {

        if (id != productoDto.Id)
            return BadRequest(new { message = $"El ID ({id}) de la URL  no coincide con el ID ({productoDto.Id}) del cuerpo de la solicitud. " });


        var productoToUpdate = await _productoService.GetById(id);

        if (productoToUpdate is not null)
        {
            await _productoService.Update(id, productoDto);
            return NoContent();
        }
        else
            return ProductNotFound(id);

    }


    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteProducto(int id)
    {
        var productToDelete = await GetProductoById(id);

        if (productToDelete is not null)
        {
            await _productoService.Delete(id);
            return Ok();
        }
        else
            return ProductNotFound(id);
    }


    public NotFoundObjectResult ProductNotFound(int id)
    {
        return NotFound(new { message = $"El producto con ID = {id} no existe. " });
    }
    public NotFoundObjectResult NegocioNotFound(int id)
    {
        return NotFound(new { message = $"El negocio con ID = {id} no existe. " });
    }
}
