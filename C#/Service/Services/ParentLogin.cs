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
    public class ParentLogin : ILogin<Parents>
    {
        private readonly IService<Parents, int> service;
        private readonly IConfiguration config;
        public ParentLogin(IService<Parents, int> service, IConfiguration configuration)
        {
            this.service = service;
            this.config = configuration;
        }
        public async Task<Parents> Authenticate(string mail, string pass)
        {
            return await service.GetByPassEmail(mail, pass);
        }

        public string Generate(Parents user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                 new Claim("Id",user.Id.ToString()),
                 new Claim("LastName",user.LastName.ToString()),
                 new Claim("FatherName",user.FatherName.ToString()),
                 new Claim("MotherName",user.MotherName.ToString()),
                 new Claim("Password", user.Password.ToString()),
                 new Claim("FatherPhone",user.FatherName.ToString()),
                 new Claim("MotherPhone",user.MotherName.ToString()),
                 new Claim(ClaimTypes.Email,user.Email),
                 new Claim(ClaimTypes.Role,"parent")

             };
            var token = new JwtSecurityToken(config["Jwt:Issuer"], config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
