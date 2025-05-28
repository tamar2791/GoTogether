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
    public class ChildRepository : IRepository<Child, string>
    {
        private readonly IContext _context;
        public ChildRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Child> Add(Child item)
        {
            await _context.Child.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task Delete(string id)
        {
            _context.Child.Remove(await Get(id));
            await _context.Save();
        }

        public async Task<Child> Get(string id)
        {
            return await _context.Child
                .Include(x => x.Parents)
                .Include(x => x.EducationalInstitution)
                .Include(x => x.Driver).ThenInclude(x => x.Chaperone)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Child>> GetAll()
        {
            return await _context.Child.Include(x => x.Parents).Include(x => x.EducationalInstitution).ToListAsync();
        }

        public Task<Child> GetByPassEmail(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<Child> Update(string id, Child item)
        {
            var child = await Get(id);
            child.Name = item.Name;
            child.Address = item.Address;
            child.IsCome = item.IsCome;
            child.IsLeave = item.IsLeave;
            child.IsPrivateCar = item.IsPrivateCar;
            child.IsPrivateChperone = item.IsPrivateChperone;
            child.IsDisable = item.IsDisable;
            child.IsLeave = item.IsLeave;
            child.Status = item.Status;
            child.DriverId = item.DriverId;
            child.EduId = item.EduId;
            child.ChaperoneId = item.ChaperoneId;
            child.ParentsId = item.ParentsId;
            await _context.Save();
            return child;
        }
        public async Task SetIsComeAndIsLeave()
        {

            foreach (var item in _context.Child)
            {
                item.IsCome = true;
                item.IsLeave = false;
            }
            await _context.Save();
        }

    }
}