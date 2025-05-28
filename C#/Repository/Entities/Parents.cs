using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class Parents
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string FatherPhone { get; set; }
        public string MotherPhone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
        public bool IsSms { get; set; }
        public virtual ICollection<Child>? Children { get; set; }
    }
}
