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
    public class ParentsRepository : IRepository<Parents, int>
    {
        private readonly IContext _context;
        public ParentsRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Parents> Add(Parents item)
        {
            await _context.Parents.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task Delete(int id)
        {
            _context.Parents.Remove(await Get(id));
            await _context.Save();
        }

        public async Task<Parents> Get(int id)
        {
            return await _context.Parents
                .Include(x=>x.Children).ThenInclude(c => c.EducationalInstitution)
                .Include(x=>x.Children).ThenInclude(c => c.Driver).ThenInclude(x=>x.Chaperone)
                .Include(x=>x.Children).ThenInclude(c => c.Chaperone)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Parents>> GetAll()
        {
            return await _context.Parents
                .Include(x => x.Children).ThenInclude(c => c.EducationalInstitution)
                .Include(x => x.Children).ThenInclude(c => c.Driver)
                .Include(x => x.Children).ThenInclude(c => c.Chaperone)
                .ToListAsync();
        }

        public async Task<Parents> GetByPassEmail(string email, string password)
        {
            Parents x = await _context.Parents.FirstOrDefaultAsync(x => x.Email == email && x.Password == password);
            return  x;
        }

        public async Task<Parents> Update(int id, Parents item)
        {
            var parents = await Get(id);
            parents.LastName = item.LastName;
            parents.FatherName = item.FatherName;
            parents.MotherName = item.MotherName;
            parents.FatherPhone=item.FatherPhone;
            parents.MotherPhone=item.MotherPhone;
            parents.Email = item.Email;
            parents.Password = item.Password;
            parents.Address = item.Address;
            parents.Status = item.Status;
            parents.IsSms = item.IsSms;
            await _context.Save();
            return parents;
        }
    }
}
