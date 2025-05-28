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
    public class ChaperoneRepositiry : IRepository<Chaperone, string>
    {
        private readonly IContext _context;
        public ChaperoneRepositiry(IContext context)
        {
            _context = context;
        }
        public async Task<Chaperone> Add(Chaperone item)
        {
            await _context.Chaperone.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task Delete(string id)
        {
            _context.Chaperone.Remove(await Get(id));
            await _context.Save();
        }

        public async Task<Chaperone> Get(string id)
        {
            return await _context.Chaperone
                .Include(x=>x.Driver)
                .FirstOrDefaultAsync(x => x.Id == id);

        }

        public async Task<List<Chaperone>> GetAll()
        {
            return await _context.Chaperone
                .Include(x=>x.Driver)
                .ToListAsync();
        }

        public Task<Chaperone> GetByPassEmail(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<Chaperone> Update(string id, Chaperone item)
        {
            var chaperone = await Get(id);
            chaperone.Name = item.Name;
            chaperone.Address = item.Address;
            chaperone.Phone = item.Phone;
            chaperone.Email = item.Email;
            chaperone.DriverId = item.DriverId;
            chaperone.Status = item.Status;
            await _context.Save();
            return chaperone;
        }

    }
}
