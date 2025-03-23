using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repository.Entities
{
    public class Child
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string FatherPhone { get; set; }
        public string MotherPhone { get; set; }
        public string Password { get; set; }
        public bool IsCome { get; set; }
        public string Email { get; set; }
        [ForeignKey("Driver")]
        public int? DriverId { get; set; }
        public virtual Driver? Driver { get; set; }
        [ForeignKey("EducationalInstitution")]
        public int? EduId { get; set; }
        public virtual EducationalInstitution? EducationalInstitution { get; set; }
    }
}
