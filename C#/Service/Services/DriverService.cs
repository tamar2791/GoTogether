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
    public class DriverService : IService<Driver, int>
    {
        private readonly IRepository<Driver,int> _repository;
        public DriverService(IRepository<Driver, int> repository)
        {
            _repository = repository;
        }

        public async Task<Driver> Add(Driver item)
        {
            return await _repository.Add(item);
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }

        public async Task<Driver> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Driver>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Driver> Update(int id, Driver item)
        {
            return await _repository.Update(id, item);
        }
    }
}
