using Repository.Entities;
using Repository.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ManagerService : IService<Manager, int>
    {
        private readonly IRepository<Manager, int> _repository;
        public ManagerService(IRepository<Manager, int> repository)
        {
            _repository= repository;
        }
        public async Task<Manager> Add(Manager item)
        {
            return await _repository.Add(item);
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }

        public async Task<Manager> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Manager>> GetAll()
        {
            return await _repository.GetAll();
        }

        public Task<Manager> GetByPassEmail(string email, string password)
        {
            return _repository.GetByPassEmail(email, password);
        }

        public async Task<Manager> Update(int id, Manager item)
        {
            return await _repository.Update(id, item);
        }
    }
}
