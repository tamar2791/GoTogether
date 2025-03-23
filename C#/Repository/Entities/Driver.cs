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
        public int CountSeats { get; set; }
        public ICollection<Child>? Children { get; set; }
        [ForeignKey("Chaperone")]
        public string? ChaperoneId { get; set; }
        public virtual Chaperone? Chaperone { get; set; }
    }
}