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
    public class ChildRepository : IRepository<Child,string>
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
            return await _context.Child.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Child>> GetAll()
        {
            return await _context.Child.ToListAsync();
        }

        public async Task<Child> Update(string id, Child item)
        {
            var child=await Get(id);
            child.Name = item.Name;
            child.Address = item.Address;
            child.FatherName = item.FatherName;
            child.MotherName = item.MotherName;
            child.FatherPhone = item.FatherPhone;
            child.MotherPhone = item.MotherPhone;
            child.Email=item.Email;
            child.Password=item.Password;
            child.IsCome=item.IsCome;
            child.DriverId = item.DriverId;
            child.EduId = item.EduId;
            await _context.Save();
            return child;
        }
    }
}