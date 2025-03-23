using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IRepository<T,W>
    {
        Task<List<T>> GetAll();
        Task<T> Get(W id);
        Task Delete(W id);
        Task<T> Add(T item);
        Task<T> Update(W id, T item);
    }
}
