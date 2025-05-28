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
    public class ParentsService:IService<Parents,int>
    {
        private readonly IRepository<Parents, int> _repository;

        public ParentsService(IRepository<Parents, int> repository)
        {
            _repository = repository;
        }

        public async Task<Parents> Add(Parents item)
        {
            return await _repository.Add(item);
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }

        public async Task<Parents> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Parents>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Parents> GetByPassEmail(string email, string password)
        {
            return await _repository.GetByPassEmail(email, password);
        }

        public async Task<Parents> Update(int id, Parents item)
        {
            return await _repository.Update(id, item);
        }
    }
}