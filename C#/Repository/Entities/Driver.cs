using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class Driver
    {
        public int DriverId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Status { get; set; }
        public ICollection<Child>? Children { get; set; }
        public string? ChaperoneId { get; set; }
        [ForeignKey("ChaperoneId")]
        public virtual Chaperone? Chaperone { get; set; }
    }
}