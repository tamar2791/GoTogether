using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Repository.Entities;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class DriverLogin : ILogin<Driver>
    {
        private readonly IService<Driver, int> service;
        private readonly IConfiguration config;
        public DriverLogin(IService<Driver, int> service, IConfiguration configuration)
        {
            this.service = service;
            this.config = configuration;
        }
        public async Task<Driver> Authenticate(string mail, string pass)
        {
            return await service.GetByPassEmail(mail, pass);
        }

        public string Generate(Driver user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                 new Claim("Id",user.DriverId.ToString()),
                 new Claim(ClaimTypes.NameIdentifier,user.Name),
                 new Claim(ClaimTypes.Email,user.Email),
                 new Claim("Password", user.Password),
                 new Claim("Phone",user.Phone),
                 new Claim(ClaimTypes.Role,"driver")

             };
            var token = new JwtSecurityToken(config["Jwt:Issuer"], config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
