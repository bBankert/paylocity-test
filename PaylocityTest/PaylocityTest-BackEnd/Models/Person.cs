using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaylocityTest_BackEnd.Models
{
    public abstract class Person
    {
        public string Name { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public virtual PersonType Type { get; set; }
    }

    public enum PersonType
    {
        Employee,
        Spouse,
        Child
    }
}
