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
    public class EducationalInstitutionService : IService<EducationalInstitution, int>
    {
        private readonly IRepository<EducationalInstitution,int> _repository;
        public EducationalInstitutionService(IRepository<EducationalInstitution, int> repository)
        {
            _repository = repository;
        }

        public async Task<EducationalInstitution> Add(EducationalInstitution item)
        {
            return await _repository.Add(item);
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }

        public async Task<EducationalInstitution> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<EducationalInstitution>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<EducationalInstitution> Update(int id, EducationalInstitution item)
        {
            return await _repository.Update(id, item);
        }
    }
}
