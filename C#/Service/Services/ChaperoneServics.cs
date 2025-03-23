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
    public class ChaperoneService : IService<Chaperone, string>
    {
        private readonly IRepository<Chaperone, string> _repository;

        public ChaperoneService(IRepository<Chaperone, string> repository)
        {
            _repository = repository;
        }

        public async Task<Chaperone> Add(Chaperone item)
        {
            return await _repository.Add(item);
        }

        public async Task Delete(string id)
        {
            await _repository.Delete(id);
        }

        public async Task<Chaperone> Get(string id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Chaperone>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Chaperone> Update(string id, Chaperone item)
        {
            return await _repository.Update(id,item);
        }
    }
}
