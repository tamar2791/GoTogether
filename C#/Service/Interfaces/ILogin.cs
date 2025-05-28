using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface ILogin<T>
    {
        Task<T> Authenticate(string mail, string pass);
        string Generate(T item);
    }
}
