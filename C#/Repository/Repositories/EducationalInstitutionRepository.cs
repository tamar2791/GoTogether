using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class EducationalInstitutionRepository : IRepository<EducationalInstitution, int>
    {
        private readonly IContext _context;
        public EducationalInstitutionRepository(IContext context)
        {
            _context = context;
        }
        public async Task<EducationalInstitution> Add(EducationalInstitution item)
        {
            await _context.EducationalInstitution.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task Delete(int id)
        {
            _context.EducationalInstitution.Remove(await Get(id));
            await _context.Save();
        }

        public async Task<EducationalInstitution> Get(int id)
        {
            return await _context.EducationalInstitution.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<EducationalInstitution>> GetAll()
        {
            return await _context.EducationalInstitution.ToListAsync();
        }

        public Task<EducationalInstitution> GetByPassEmail(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<EducationalInstitution> Update(int id, EducationalInstitution item)
        {
            var educationalInstitution = await Get(id);
            educationalInstitution.Name = item.Name;
            educationalInstitution.Phone = item.Phone;
            educationalInstitution.Address = item.Address;
            educationalInstitution.StartTime = item.StartTime;
            educationalInstitution.EndTime = item.EndTime;
            educationalInstitution.Email = item.Email;
            await _context.Save();
            return educationalInstitution;
        }
    }
}
