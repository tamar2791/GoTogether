using Microsoft.Extensions.DependencyInjection;
using Repository.Entities;
using Repository.Repositories;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public static class ExtentionService
    {
        public static IServiceCollection AddServices(this IServiceCollection service)
        {
            service.AddRepository();
            service.AddScoped<IService<Child,string>, ChildService>();
            service.AddScoped<IService<Driver,int>, DriverService>();
            service.AddScoped<IService<Chaperone,string>, ChaperoneService>();
            service.AddScoped<IService<Manager,int>, ManagerService>();
            service.AddScoped<IService<EducationalInstitution, int>, EducationalInstitutionService>();
            service.AddScoped<IAlgorithm, Algorithm>();
            return service;
        }
    }
}
