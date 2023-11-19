using Microsoft.AspNetCore.Mvc;
using DeliveryAPI.Services;
using DeliveryAPI.Data.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace DeliveryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{

    private readonly LoginService loginService;

    private  IConfiguration config;

    public LoginController(LoginService loginService, IConfiguration config)
    {
        this.config = config;
        this.loginService = loginService;
    }

    [HttpPost("autenticar/usuario")]
    public async Task<IActionResult> UserLogin(UserLoginDtoIn usuarioDto)
    {
        var usuario = await loginService.AuthenticateUser(usuarioDto);

        if (usuario is null)
        {
            return BadRequest(new { message = "Credenciales invalidas." });
        }
        else
        {
            return Ok(usuario);
        }

    }

    [Authorize]
    [HttpGet("validate-token")]
    public IActionResult ValidateToken()
    {
            return Ok(true);
    }


}
