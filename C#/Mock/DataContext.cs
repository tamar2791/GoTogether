using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mock
{
    public class DataContext : DbContext, IContext
    {
        public DbSet<Child> Child { get ; set; }
        public DbSet<Driver> Driver { get; set ; }
        public DbSet<Chaperone> Chaperone { get; set ; }
        public DbSet<Manager> Manager { get; set; }
        public DbSet<EducationalInstitution> EducationalInstitution { get; set; }
        public DbSet<Parents> Parents { get; set; }

        public async Task Save()
        {
            await SaveChangesAsync();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=תמי-זלץ;database=GoTogethet;trusted_connection=true;TrustServerCertificate=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chaperone>()
                .HasOne(c => c.Driver)
                .WithOne(d => d.Chaperone)
                .HasForeignKey<Chaperone>(c => c.DriverId)
                .OnDelete(DeleteBehavior.Cascade); // או DeleteBehavior.NoAction אם צריך למנוע מחיקה
        }
    }
}
