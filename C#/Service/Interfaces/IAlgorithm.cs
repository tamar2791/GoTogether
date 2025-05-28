using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IAlgorithm
    {
        public Task<string> LogIn(string email, string password);
        public Task<string> SignUp(string email, string password);
        public Task SendMessege(string number, int id,string messege);
        public Task SetIsCome();
    }
}
