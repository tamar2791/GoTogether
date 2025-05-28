using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Entities
{
    public class Child
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public bool IsCome { get; set; }
        public bool IsLeave { get; set; }
        public bool Status { get; set; }
        public bool IsDisable { get; set; }
        public bool IsPrivateCar { get; set; }
        public bool IsPrivateChperone { get; set; }
        public int? DriverId { get; set; }
        [ForeignKey("DriverId")]
        public virtual Driver? Driver { get; set; }
        public int? EduId { get; set; }
        [ForeignKey("EduId")]
        public virtual EducationalInstitution? EducationalInstitution { get; set; }
        public int? ParentsId { get; set; }
        [ForeignKey("ParentsId")]
        public virtual Parents? Parents { get; set; }
        public string? ChaperoneId { get; set; }
        [ForeignKey("ChaperoneId")]
        public virtual Chaperone? Chaperone { get; set; }
    }
}
