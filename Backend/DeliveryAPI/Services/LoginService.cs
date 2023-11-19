
using DeliveryAPI.Data;
using DeliveryAPI.Data.Models;
using DeliveryAPI.Data.DTOs;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DeliveryAPI.Services;
public class LoginService
{

    private readonly PiaAppMovContext _context;
    private IConfiguration config;

    public LoginService(PiaAppMovContext context, IConfiguration config)
    {
        _context = context;
        this.config = config;
    }

    public async Task<UserLoginDtoOut> AuthenticateUser(UserLoginDtoIn userData)
    {
        var userCreds = new UserLoginDtoOut();
        var eUser = await GetUser(userData);

        if (eUser is null)
        {
            return null;
        }
        else
        {
            string token = GenerateToken(eUser);
            int id = eUser.Id;

            userCreds.Id = id;
            userCreds.Token = token;

            return userCreds;
        }
    }

    private async Task<Usuario?> GetUser(UserLoginDtoIn usuario)
    {
        var coincidence = await _context.Usuarios.SingleOrDefaultAsync(x => x.Email == usuario.Email);

        if (coincidence == null || !BC.Verify(usuario.Pwd, coincidence.Contraseña))
        {
            return null;
        }
        else
            return coincidence;
    }


    private string GenerateToken(Usuario usuario)
    {
        var claims = new[]
        {
            new Claim("id", usuario.Id.ToString()),
            new Claim("email", usuario.Email),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("JWT:Key").Value));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var securityToken = new JwtSecurityToken
        (
            claims: claims,
            expires: DateTime.Now.AddDays(30),
            signingCredentials: creds
        );

        string token = new JwtSecurityTokenHandler().WriteToken(securityToken);

        return token;
    }


}
