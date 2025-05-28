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
    public class ManagerRepository : IRepository<Manager, int>
    {
        private readonly IContext _context;
        public ManagerRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Manager> Add(Manager item)
        {
            await _context.Manager.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task Delete(int id)
        {
            _context.Manager.Remove(await Get(id));
            await _context.Save();
        }

        public async Task<Manager> Get(int id)
        {
            return await _context.Manager.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Manager>> GetAll()
        {
            return await _context.Manager.ToListAsync();
        }

        public async Task<Manager> Update(int id, Manager item)
        {
            var manager = await Get(id);
            manager.Name = item.Name;
            manager.Phone = item.Phone;
            manager.Password = item.Password;

            await _context.Save();
            return manager;
        }
        public async Task<Manager> GetByPassEmail(string email, string password)
        {
            return await _context.Manager.FirstOrDefaultAsync(x => x.Email == email && x.Password == password);
        }
    }
}
