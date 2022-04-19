namespace PaylocityTest_BackEnd.Models
{
    public class Employee : Person
    {
        public ICollection<Dependent> Dependents { get; set; }
    }
}
