using DeliveryAPI.Data.Models;
using DeliveryAPI.Data.DTOs;
using DeliveryAPI.Services;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace DeliveryAPI.Controllers;

//[Authorize]
[ApiController]
[Route("api/[controller]")]
public class NegocioController : ControllerBase
{
    private readonly NegocioService _negocioService;

    public NegocioController(NegocioService negocioService)
    {
        _negocioService = negocioService;
    }

    [HttpGet("getall")]
    public async Task<IActionResult> GetNegocios()
    {
        var negocios = await _negocioService.GetAll();
        return Ok(negocios);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetNegocioById(int id)
    {
        var negocio = await _negocioService.GetById(id);
        if (negocio is null)
            return NegocioNotFound(id);

        return Ok(negocio);
    }

    [HttpGet("facultad/{facultadId}")]
    public async Task<IActionResult> GetNegociosByFacultad(int facultadId)
    {
        var negocios = await _negocioService.GetByFacultad(facultadId);
        if (negocios is not null)
            return Ok(negocios);

        return NotFound();
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateNegocio(NegocioDtoIn negocio)
    {
        var newNegocio = await _negocioService.Create(negocio);
        return CreatedAtAction(nameof(GetNegocioById), new { id = newNegocio.Id }, newNegocio);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateNegocio(int id, NegocioDtoIn negocio)
    {
        if (id != negocio.Id)
            return BadRequest(new { message = $"El ID ({id}) de la URL  no coincide con el ID ({negocio.Id}) del cuerpo de la solicitud. " });


        var negocioToUpdate = await _negocioService.GetById(id);

        if (negocioToUpdate is not null)
        {
            await _negocioService.Update(id, negocio);
            return NoContent();
        }
        else
            return NegocioNotFound(id);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteNegocio(int id)
    {
        var negocio = await _negocioService.GetById(id);
        if (negocio is not null)
        {
            await _negocioService.Delete(id);
            return Ok();
        }
        else
            return NegocioNotFound(id);

    }

    public NotFoundObjectResult NegocioNotFound(int id)
    {
        return NotFound(new { message = $"El negocio con ID = {id} no existe. " });
    }


}
