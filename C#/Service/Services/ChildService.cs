using Microsoft.IdentityModel.Tokens;
using Repository.Entities;
using Repository.Interfaces;
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
    public class ChildService : IService<Child, string>
    {
        private readonly IRepository<Child, string> _repository;

        public ChildService(IRepository<Child, string> repository)
        {
            _repository = repository;
        }

        public async Task<Child> Add(Child item)
        {
            return await _repository.Add(item);
        }

        public async Task Delete(string id)
        {
            await _repository.Delete(id);
        }

        public async Task<Child> Get(string id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Child>> GetAll()
        {
            return await _repository.GetAll();
        }

        public Task<Child> GetByPassEmail(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<Child> Update(string id, Child item)
        {
            return await _repository.Update(id, item);
        }
    }
}
