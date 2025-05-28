using Microsoft.EntityFrameworkCore;
using Repository.Entities;

namespace Repository.Interfaces
{
    public interface IContext
    {
        DbSet<Child> Child { get; set; }
        DbSet<Driver> Driver { get; set; }
        DbSet<Chaperone> Chaperone { get; set; }
        DbSet<Manager> Manager { get; set; }
        DbSet<EducationalInstitution> EducationalInstitution { get; set; }
        DbSet<Parents> Parents { get; set; }
        public Task Save();
    }
}
