using Microsoft.Extensions.DependencyInjection;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public static class ExtentionRepository
    {
        public static IServiceCollection AddRepository(this IServiceCollection service)
        {
            service.AddScoped<IRepository<Child,string>, ChildRepository>();
            service.AddScoped<IRepository<Driver,int>, DriverRepository>();
            service.AddScoped<IRepository<Chaperone, string>, ChaperoneRepositiry>();
            service.AddScoped<IRepository<Manager,int>, ManagerRepository>();
            service.AddScoped<IRepository<EducationalInstitution, int>, EducationalInstitutionRepository>();
            service.AddScoped<IRepository<Parents, int>, ParentsRepository>();
            service.AddScoped<ChildRepository>();
            return service;
        }
    }
}
