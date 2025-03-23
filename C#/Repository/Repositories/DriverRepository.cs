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
    public class DriverRepository:IRepository<Driver,int>
    {
        private readonly IContext _context;
        public DriverRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Driver> Add(Driver item)
        {
            await _context.Driver.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task Delete(int id)
        {
            _context.Driver.Remove(await Get(id));
            await _context.Save();
        }

        public async Task<Driver> Get(int id)
        {
            return await _context.Driver.FirstOrDefaultAsync(x => x.DriverId == id);
        }

        public async Task<List<Driver>> GetAll()
        {
            return await _context.Driver.ToListAsync();
        }

        public async Task<Driver> Update(int id, Driver item)
        {
            var driver=await Get(id);
            driver.Name= item.Name;
            driver.Phone=item.Phone;
            driver.Address=item.Address;
            driver.CountSeats = item.CountSeats;
            driver.ChaperoneId=item.ChaperoneId;
            await _context.Save();
            return driver;
        }
    }
}
